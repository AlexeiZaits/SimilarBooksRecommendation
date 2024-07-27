from typing import List

from pydantic import BaseModel, Field
from typing_extensions import TypedDict


class BookRecommendationInfo(TypedDict):
    """Класс данных для отдельной рекомендации по книге"""

    uid: str
    image_link: str
    category: str
    author: str
    title: str
    score: float


class BooksResponse(BaseModel):
    """Шаблон ответа от api /predict"""

    data: List[BookRecommendationInfo]
    status: int = Field(..., title="status")


class DescriptionInput(BaseModel):
    """Шаблон входных данных от api /predict"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=6, title="number_chunks")
    offset: int = Field(default=0, title="offset")
    collection_name: str = Field(default="SimilarBooksService", title="collection_name")


class RedisMetadata(BaseModel):
    """Шаблон метаданных в Redis"""

    category: str = Field(..., title="category")
    author: str = Field(..., title="author")


class RedisResponse(BaseModel):
    """Шаблон выходных данных от Redis"""

    metadata: RedisMetadata
    description: str
