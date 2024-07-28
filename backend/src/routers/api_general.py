import os
from http import HTTPStatus
from typing import Annotated, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends

from backend.config.custom_status import CustomHTTPStatus
from backend.src.exceptions.custom_exceptions import RankingErrorException
from backend.src.models.models import get_embedder, get_qdrant_connection, get_redis_connection
from backend.src.schemas.tamplates import BooksResponse, DescriptionInput, UpdatedQueryResponse
from backend.src.scripts.qdrant_scripts import qdrant_search
from backend.src.scripts.ranking import ranking_titles
from backend.src.scripts.redis_scripts import get_description_by_title

load_dotenv()
router = APIRouter(tags=["General Api"])


@router.post("/update_query", response_model=Optional[UpdatedQueryResponse])
def update_query(
    data: Annotated[DescriptionInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    embedder=Depends(get_embedder),
):
    """Возвращает реранжированный список с названиями книг"""
    content = qdrant_search(
        query=data.query,
        embedder=embedder,
        qdrant_client=qdrant_client,
        collection_name=os.getenv("QDRANT_COLLECTION_TITLES"),
        limit=data.limit,
        offset=data.offset,
    )

    # Реренжируем названия по косинусной близости
    try:
        titles = ranking_titles(content=[msg.payload["title"] for msg in content], query=data.query)
    except RankingErrorException:
        return UpdatedQueryResponse(titles=[], status=CustomHTTPStatus.RankingErrorStatus.value)

    return UpdatedQueryResponse(titles=titles, status=HTTPStatus.OK)


# TODO: Реализовать обработку ошибок + логирование в GrayLog
@router.post("/get_book_recommendations", response_model=BooksResponse)
def get_book_recommendations(
    data: Annotated[DescriptionInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    redis_client=Depends(get_redis_connection),
    embedder=Depends(get_embedder),
):
    """Метод для получения рекомендаций книг для книги по ее названию"""

    # Получение описания книги по ее названию. Поиск в Redis + Qdrant
    redis_response = get_description_by_title(redis_client=redis_client, title=data.query)

    # TODO: Достаточно костыльно. Надо убрать когда данные будут валиды + реализована динамическая поисковая строка
    # Если в Redis нет, то начинаем искать похожие на query названия
    if redis_response.status == CustomHTTPStatus.RedisDataNotFouldStatus.value:
        # Делаем запрос в Qdrant, чтобы найти похожие название

        update_response = update_query(data=data, embedder=embedder, qdrant_client=qdrant_client)
        if update_response.status == CustomHTTPStatus.RankingErrorStatus.value:
            return BooksResponse(status=CustomHTTPStatus.RankingErrorStatus.value, data=[])

        title = update_response.titles[0]

        # Повторно ищем в Redis уже актуальное названия книги
        redis_response = get_description_by_title(redis_client=redis_client, title=title)

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

    return BooksResponse(status=HTTPStatus.OK, data=result)
