import os
from http import HTTPStatus

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Query

from backend.config.custom_status import CustomHTTPStatus
from backend.src.models.models import get_embedder, get_qdrant_connection, get_redis_connection
from backend.src.routers.api_app import book
from backend.src.schemas.templates_recsys import RecomendationInput, RecomendationResponse
from backend.src.scripts.qdrant_scripts import qdrant_search

load_dotenv()
router = APIRouter(tags=["Api for recommendation system"])


# TODO: Реализовать обработку ошибок + логирование в GrayLog
@router.get("/get_book_recommendations", response_model=RecomendationResponse)
def get_book_recommendations(
    query: str = Query("Ведьмак", description="The title of the book for recommendations"),
    limit: int = Query(10, description="The number of recommendations to return"),
    offset: int = Query(0, description="The offset for pagination"),
    qdrant_client=Depends(get_qdrant_connection),
    redis_client=Depends(get_redis_connection),
    embedder=Depends(get_embedder),
):
    """Метод для получения рекомендаций книг для книги по ее названию"""

    # Переводим все в Pydantic класс для автоматической валидации параметров GET-запроса
    data = RecomendationInput(query=query, limit=limit, offset=offset)

    # Получение описания книги по ее названию. Поиск в Redis
    redis_response = book(redis_client=redis_client, title=data.query)
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
