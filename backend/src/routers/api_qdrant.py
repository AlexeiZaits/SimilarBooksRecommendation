from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Body, Depends

from backend.src.models.models import get_embedder, get_qdrant_connection
from backend.src.schemas.tamplates import BooksResponse, DescriptionInput

router = APIRouter(tags=["Qdrant Api"])


# TODO: Добавить возможность поиска с фильтром и гибридный поиск
@router.post("/get_similar", response_model=BooksResponse)
def qdrant_search(
    data: Annotated[DescriptionInput, Body()],
    qdrant_client=Depends(get_qdrant_connection),
    embedder=Depends(get_embedder),
):
    """Метод для поиска в Qdrant"""

    query_vector = embedder.encode(data.query, batch_size=1, normalize_embeddings=True)
    message_content = qdrant_client.search(
        collection_name=data.collection_name, query_vector=query_vector, limit=data.limit, offset=data.offset
    )
    result = [
        dict(recommendation.payload, score=recommendation.score, uid=recommendation.id)
        for recommendation in message_content
    ]

    return BooksResponse(status=HTTPStatus.OK, data=result)
