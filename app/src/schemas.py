
from typing import List

from pydantic import BaseModel, Field


class BooksResponse(BaseModel):
    status: int = Field(..., title="status")
    data: dict[str, str] = Field(..., title="data")
