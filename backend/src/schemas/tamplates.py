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


class RecomendationResponse(BaseModel):
    """Шаблон ответа от api /predict"""

    data: Optional[List[BookRecommendationInfo]]
    status: Optional[int] = Field(..., title="status")


class RecomendationInput(BaseModel):
    """Шаблон входных данных от api /predict"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=6, title="number_chunks")
    offset: int = Field(default=0, title="offset")


class RedisInput(BaseModel):
    """Шаблон входных данных для поиска инфы по книге"""

    title: str = Field(..., title="title")


class RedisMetadata(BaseModel):
    """Шаблон метаданных в Redis"""

    category: str = Field(..., title="category")
    author: str = Field(..., title="author")
    image: str = Field(..., title="image")
    info: str = Field(..., title="info")
    uid: str = Field(..., title="uid")


class RedisResponse(BaseModel):
    """Шаблон выходных данных от Redis"""

    metadata: Optional[RedisMetadata]
    description: Optional[str]
    status: int = Field(..., title="status")


class UpdateQueryInput(BaseModel):
    """Шаблон входных данных от api/update_query"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=10, title="number_chunks")


class UpdatedQueryResponse(BaseModel):
    """Шаблон Обновленных названий книг"""

    titles: Optional[List[str]]
    status: int = Field(..., title="status")
