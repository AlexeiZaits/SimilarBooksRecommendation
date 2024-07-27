import os
from http import HTTPStatus
from typing import Annotated

from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends

from backend.src.models import get_embedder, get_qdrant_connection, get_redis_connection
from backend.src.redis_scripts import fetch_data_and_metadata
from backend.src.schemas import BooksResponse, DescriptionInput

load_dotenv()

router = APIRouter(tags=["ML API"])


ROOT_PATH = os.getcwd()


# TODO: Декомпозиция на метод обращения к Qdrant и поиску похожих книг
@router.post("/predict", response_model=BooksResponse)
def predict(
    data: Annotated[DescriptionInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    redis_client=Depends(get_redis_connection),
    embedder=Depends(get_embedder),
):
    """Метод для получения инференса по api"""

    # Проверяем наличие данных
    if not data.query:
        return BooksResponse(status=HTTPStatus.BAD_REQUEST, data=[])  #  error="Input description is not found"

    # Получение данных и метаданных
    data_and_metadata = fetch_data_and_metadata(redis_connection=redis_client, name=data.query)
    # TODO: реализовать поиск похожих названий
    if data_and_metadata is not None:
        description = data_and_metadata["description"]
        category = data_and_metadata["metadata"]["category"]
        author = data_and_metadata["metadata"]["author"]

        print(description)
        print(category)
        print(author)

    # TODO: Реализовать обработку ошибок. МБ это логирование в GrayLog или сразу Kafka
    query_vector = embedder.encode(data.query, batch_size=1, normalize_embeddings=True)
    message_content = qdrant_client.search(
        collection_name=data.collection_name, query_vector=query_vector, limit=data.limit, offset=data.offset
    )

    result = [
        dict(recommendation.payload, score=recommendation.score, uid=recommendation.id)
        for recommendation in message_content
    ]

    return BooksResponse(status=HTTPStatus.OK, data=result)
