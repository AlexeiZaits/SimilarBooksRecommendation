from typing import Annotated, Optional

from fastapi import APIRouter, Body, Depends

from backend.src.models.models import get_redis_connection
from backend.src.scripts.redis_scripts import fetch_data_and_metadata
from backend.src.schemas.tamplates import RedisMetadata, RedisResponse

router = APIRouter(tags=["Redis Api"])


@router.post("/get_book_data", response_model=Optional[RedisResponse])
def get_description_by_title(title: Annotated[str, Body()], redis_client=Depends(get_redis_connection)):
    """Метод для получения данных и метаданных из Redis"""

    data_and_metadata = fetch_data_and_metadata(redis_connection=redis_client, name=title)
    if data_and_metadata is not None:
        description = data_and_metadata.description
        metadata = RedisMetadata(category=data_and_metadata.metadata.category, author=data_and_metadata.metadata.author)

        return RedisResponse(description=description, metadata=metadata)

    return None
