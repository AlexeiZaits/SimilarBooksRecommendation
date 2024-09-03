import os
from http import HTTPStatus
from typing import Annotated, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends

from backend.config.custom_status import CustomHTTPStatus
from backend.src.exceptions.custom_exceptions import (
    AutocompliteIsEmptyException,
    RankingErrorException,
    RedisDataNotFoundException,
)
from backend.src.models.models import get_embedder, get_qdrant_connection, get_redis_connection, get_trie
from backend.src.schemas.tamplates import (
    RecomendationInput,
    RecomendationResponse,
    RedisInput,
    RedisResponse,
    UpdatedQueryResponse,
    UpdateQueryInput,
)
from backend.src.scripts.qdrant_scripts import qdrant_search
from backend.src.scripts.ranking import autocomplete_books_trie, ranking_titles
from backend.src.scripts.redis_scripts import get_book

load_dotenv()
router = APIRouter(tags=["General Api"])


@router.post("/book", response_model=Optional[RedisResponse])
def book(data: Annotated[RedisInput, Body()], redis_client=Depends(get_redis_connection)):
    """Получаем всю инфу о книге по ее названию"""
    try:
        data = get_book(redis_connection=redis_client, name=data.title)
    except RedisDataNotFoundException:
        return RedisResponse(
            description=None,
            metadata=None,
            status=CustomHTTPStatus.RedisDataNotFouldStatus.value,
        )

    return data


@router.post("/update_query", response_model=Optional[UpdatedQueryResponse])
def update_query(
    data: Annotated[UpdateQueryInput, Body()],
    trie=Depends(get_trie),
):
    """Возвращает реранжированный список с названиями книг"""

    # Пытаемся найти похожую книгу. Если не выходит, то возвращает соответствующий статус ошибки
    try:
        content = autocomplete_books_trie(data.query, trie, limit=data.limit)
        print(content)
    except AutocompliteIsEmptyException:
        return UpdatedQueryResponse(titles=None, status=CustomHTTPStatus.AutocompliteIsEmptyStatus.value)

    # Реренжируем названия по косинусной близости
    try:
        titles = ranking_titles(content=content, query=data.query)
    except RankingErrorException:
        return UpdatedQueryResponse(titles=None, status=CustomHTTPStatus.RankingErrorStatus.value)

    return UpdatedQueryResponse(titles=titles, status=HTTPStatus.OK)


# TODO: Реализовать обработку ошибок + логирование в GrayLog
@router.post("/get_book_recommendations", response_model=RecomendationResponse)
def get_book_recommendations(
    data: Annotated[RecomendationInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    redis_client=Depends(get_redis_connection),
    embedder=Depends(get_embedder),
):
    """Метод для получения рекомендаций книг для книги по ее названию"""

    # Получение описания книги по ее названию. Поиск в Redis
    redis_response = book(redis_client=redis_client, data=RedisInput(title=data.query))
    if redis_response.status == CustomHTTPStatus.RedisDataNotFouldStatus.value:
        return RecomendationResponse(status=CustomHTTPStatus.RedisDataNotFouldStatus.value, data=None)

    # Обновляем запрос. Меняем его на описание найденной книги
    data.query = redis_response.description

    # Поиск в qdrant по описанию найденной книги
    content = qdrant_search(
        query=data.query,
        embedder=embedder,
        qdrant_client=qdrant_client,
        collection_name=os.getenv("QDRANT_COLLECTION_DESCRIPTION"),
        limit=data.limit,
        offset=data.offset,
    )

    # Формируем результат
    result = [dict(element.payload, score=element.score, uid=element.id) for element in content]

    return RecomendationResponse(status=HTTPStatus.OK, data=result)
