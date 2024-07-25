from typing import List

from pydantic import BaseModel, Field
from typing_extensions import TypedDict


class BookRecommendationInfo(TypedDict):
    """Класс данных для отдельной рекомендации по книге"""
    category: str
    author: str
    title: str
    score: float


class BooksResponse(BaseModel):
    """Шаблон ответа от api /predict"""

    status: int = Field(..., title="status")
    data: List[BookRecommendationInfo] = Field(..., title="data")
    error: str = Field(..., title="error_message")


class DescriptionInput(BaseModel):
    """Шаблон входных данных от api /predict"""

    book_desc: str = Field(..., title="boot_description")
    n_chunks: int = Field(default=6, title="number_chunks")
    offset: int = Field(default=0, title="offset")
    collection_name: str = Field(default="SimilarBooksService", title="collection_name")
