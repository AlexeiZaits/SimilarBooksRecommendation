from typing import List, Optional

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

    data: Optional[List[BookRecommendationInfo]]
    status: Optional[int] = Field(..., title="status")


class DescriptionInput(BaseModel):
    """Шаблон входных данных от api /predict"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=6, title="number_chunks")
    offset: int = Field(default=0, title="offset")


class RedisMetadata(BaseModel):
    """Шаблон метаданных в Redis"""

    category: str = Field(..., title="category")
    author: str = Field(..., title="author")


class RedisResponse(BaseModel):
    """Шаблон выходных данных от Redis"""

    metadata: RedisMetadata
    description: str
    status: int = Field(..., title="status")


class UpdatedQueryResponse(BaseModel):
    """Шаблон Обновленных названий книг"""

    titles: List[str]
    status: int = Field(..., title="status")
