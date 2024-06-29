from pydantic import BaseModel, Field


class BooksResponse(BaseModel):
    """Шаблон ответа от api /predict"""

    status: int = Field(..., title="status")
    data: dict[str, str] = Field(..., title="data")
