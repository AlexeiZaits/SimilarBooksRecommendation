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

    status: int = Field(..., title="status")
    data: List[BookRecommendationInfo] = Field(..., title="data")


class DescriptionInput(BaseModel):
    """Шаблон входных данных от api /predict"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=6, title="number_chunks")
    offset: int = Field(default=0, title="offset")
    collection_name: str = Field(default="SimilarBooksService", title="collection_name")
