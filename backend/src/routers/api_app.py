from http import HTTPStatus
from typing import Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Query

from backend.config.custom_status import CustomHTTPStatus
from backend.src.exceptions.custom_exceptions import (
    AutocompliteIsEmptyException,
    DataBaseException,
    RankingErrorException,
    RedisDataNotFoundException,
)
from backend.src.models.models import get_db_connection, get_redis_connection, get_trie
from backend.src.schemas.tamplates_app import (
    BooksBatchInput,
    BooksBatchResponse,
    RedisInput,
    RedisResponse,
    UpdateQueryInput,
    UpdateQueryResponse,
)
from backend.src.scripts.ranking import autocomplete_books_trie, ranking_titles
from backend.src.scripts.redis_scripts import get_book
from backend.src.scripts.sql_scripts import get_books_batch

load_dotenv()
router = APIRouter(tags=["Api for main application"])


@router.get("/books", response_model=Optional[BooksBatchResponse])
def books(
    limit: int = Query(5, description="Limit of books to return"),
    offset: int = Query(0, description="Offset of books to return"),
    category_filter: Optional[str] = Query(None, description="Filter books by category"),
    db_connection=Depends(get_db_connection),
):
    """Получаем всю инфу о книге по ее названию"""

    # Переводим все в Pydantic класс для автоматической валидации параметров GET-запроса
    params = BooksBatchInput(limit=limit, offset=offset, category_filter=category_filter)
    try:
        data = get_books_batch(
            engine=db_connection, limit=params.limit, offset=params.offset, category_filter=params.category_filter
        )
    except DataBaseException:
        return BooksBatchResponse(
            books=None,
            status=CustomHTTPStatus.DataBaseError.value,
        )

    # Если введене несуществующас категория -> на выходе будет пустой список
    if len(data.books) == 0:
        return BooksBatchResponse(books=None, status=CustomHTTPStatus.CategoryFilterIsNotFound.value)

    return data


@router.get("/book", response_model=Optional[RedisResponse])
def book(
    title: str = Query("Ведьмак", description="Title of a book"),
    redis_client=Depends(get_redis_connection),
):
    """Получаем всю инфу о книге по ее названию"""

    # Переводим все в Pydantic класс для автоматической валидации параметров GET-запроса
    data = RedisInput(title=title)
    try:
        data = get_book(redis_connection=redis_client, name=data.title)
    except RedisDataNotFoundException:
        return RedisResponse(
            description=None,
            metadata=None,
            status=CustomHTTPStatus.RedisDataNotFouldStatus.value,
        )

    return data


@router.get("/update_query", response_model=Optional[UpdateQueryResponse])
def update_query(
    query: str = Query("Ведьма", description="The search query"),
    limit: int = Query(10, description="The number of results to return"),
    trie=Depends(get_trie),
):
    """Возвращает реранжированный список с названиями книг"""

    # Переводим все в Pydantic класс для автоматической валидации параметров GET-запроса
    data = UpdateQueryInput(query=query, limit=limit)

    # Пытаемся найти похожую книгу. Если не выходит, то возвращает соответствующий статус ошибки
    try:
        content = autocomplete_books_trie(prefix=data.query, trie=trie, limit=data.limit)
    except AutocompliteIsEmptyException:
        return UpdateQueryResponse(titles=None, status=CustomHTTPStatus.AutocompliteIsEmptyStatus.value)

    # Реренжируем названия по косинусной близости
    try:
        titles = ranking_titles(content=content, query=query)
    except RankingErrorException:
        return UpdateQueryResponse(titles=None, status=CustomHTTPStatus.RankingErrorStatus.value)

    return UpdateQueryResponse(titles=titles, status=HTTPStatus.OK)
