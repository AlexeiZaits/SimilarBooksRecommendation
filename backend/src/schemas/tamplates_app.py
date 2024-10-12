from typing import List, Optional

from pydantic import BaseModel, Field


# ! Шаблоны для Redis
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


# ! Шаблоны для БД
class BookInfo(BaseModel):
    """Информация об одной книжке"""

    uid: str = Field(..., title="uid")
    image_link: str = Field(..., title="image")
    category: str = Field(..., title="category")
    author: str = Field(..., title="author")
    title: str = Field(..., title="title")


class BooksBatchResponse(BaseModel):
    """Список из книг"""

    data: Optional[List[BookInfo]]
    status: int = Field(..., title="status")


class BooksBatchInput(BaseModel):
    """Список из книг"""

    category_filter: Optional[str] = Field(default=None, title="category_filter")
    limit: int = Field(default=5, title="limit")
    offset: int = Field(default=0, title="offset")


# ! Шаблоны для autocomplite
class AutoCompliteInput(BaseModel):
    """Шаблон входных данных от api/update_query"""

    query: str = Field(..., title="boot_description")
    limit: int = Field(default=10, title="number_chunks")


class AutoCompliteResponse(BaseModel):
    """Шаблон Обновленных названий книг"""

    titles: Optional[List[str]]
    status: int = Field(..., title="status")
    type: str = Field(default="search", title="type")
