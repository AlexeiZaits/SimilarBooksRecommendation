from typing import List, Optional

from pydantic import BaseModel, Field
from typing_extensions import TypedDict


# ! Шаблоны для рекомендательной системы
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
