import os
from http import HTTPStatus
from typing import Annotated

from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends

from src.models import get_embedder, get_qdrant_connection
from src.schemas import BooksResponse, DescriptionInput

load_dotenv()

router = APIRouter(tags=["ML API"])


ROOT_PATH = os.getcwd()


@router.post("/predict", response_model=BooksResponse)
def predict(
    data: Annotated[DescriptionInput, Body()], _qdrant=Depends(get_qdrant_connection), _embedder=Depends(get_embedder)
):
    """Метод для получения инференса по api"""

    # Проверяем наличие данных
    if not data.book_desc:
        return BooksResponse(status=HTTPStatus.BAD_REQUEST, data=[], error="Input description is not found")

    # TODO: передавать не описание, а название книги. Продумать как это можно сделать
    # Мб это отдельная коллекция с названиями книг -> искать по ним наиболее подходящее и по нему брать описание

    # TODO: Реализовать обработку ошибок
    # Если данные есть, то получаем предикт
    # try:
    query_vector = _embedder.encode(data.book_desc, batch_size=1, normalize_embeddings=True)
    message_content = _qdrant.search(
        collection_name=data.collection_name, query_vector=query_vector, limit=data.n_chunks, offset=data.offset
    )

    # TODO: Реализовать поиск по датасету с книгами. Например Redis
    result = [dict(recommendation.payload, score=recommendation.score) for recommendation in message_content]
    # # Отлавливаем ошибки и возвращаем их на бэк
    # except Exception as err:
    #     return BooksResponse(status=HTTPStatus.INTERNAL_SERVER_ERROR, data=[], error=err)

    # Если ошибок не было
    return BooksResponse(status=HTTPStatus.OK, data=result, error="")
