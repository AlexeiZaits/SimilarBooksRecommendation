import os
from http import HTTPStatus
from typing import Annotated

from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends

from backend.src.models import get_embedder, get_qdrant_connection
from backend.src.schemas import BooksResponse, DescriptionInput

load_dotenv()

router = APIRouter(tags=["ML API"])


ROOT_PATH = os.getcwd()


@router.post("/predict", response_model=BooksResponse)
def predict(
    data: Annotated[DescriptionInput, Body()], qdrant=Depends(get_qdrant_connection), embedder=Depends(get_embedder)
):
    """Метод для получения инференса по api"""

    # Проверяем наличие данных
    if not data.description:
        return BooksResponse(status=HTTPStatus.BAD_REQUEST, data=[])  #  error="Input description is not found"

    # TODO: Интеграция с Redis + отдельная коллекция на qdrant для поиска названий книг
    # Мб это отдельная коллекция с названиями книг -> искать по ним наиболее подходящее и по нему брать описание

    # TODO: Реализовать обработку ошибок. МБ это логирование в GrayLog или сразу Kafka
    query_vector = embedder.encode(data.description, batch_size=1, normalize_embeddings=True)
    message_content = qdrant.search(
        collection_name=data.collection_name, query_vector=query_vector, limit=data.limit, offset=data.offset
    )

    result = [
        dict(recommendation.payload, score=recommendation.score, uid=recommendation.id)
        for recommendation in message_content
    ]

    return BooksResponse(status=HTTPStatus.OK, data=result)
