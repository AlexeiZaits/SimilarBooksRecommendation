from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Body, Depends

from backend.src.models.models import get_embedder, get_qdrant_connection, get_redis_connection
from backend.src.routers.api_qdrant import qdrant_search
from backend.src.routers.api_redis import get_description_by_title
from backend.src.schemas.tamplates import BooksResponse, DescriptionInput

router = APIRouter(tags=["General Api"])


# TODO: Реализовать обработку ошибок + логирование в GrayLog
@router.post("/get_book_recommendations", response_model=BooksResponse)
def predict(
    data: Annotated[DescriptionInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    redis_client=Depends(get_redis_connection),
    embedder=Depends(get_embedder),
):
    """Метод для получения рекомендаций книг для книги по ее названию"""

    # Проверяем наличие данных
    if not data.query:
        return BooksResponse(status=HTTPStatus.BAD_REQUEST, data=[])  #  error="Input description is not found"

    # Получение данных и метаданных
    redis_response = get_description_by_title(redis_client=redis_client, title=data.query)
    print(redis_response)

    result = qdrant_search(data=data, qdrant_client=qdrant_client, embedder=embedder)

    return result
