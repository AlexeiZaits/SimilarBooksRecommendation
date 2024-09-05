import os
from datetime import datetime
from typing import Annotated

from pydantic_settings import BaseSettings
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

# from sqlalchemy import create_engine


class Settings(BaseSettings):
    """Настройки БД"""

    POSTGRE_HOST: str
    POSTGRE_PORT: int
    POSTGRE_DATABASE: str
    POSTGRE_USER: str
    POSTGRE_PASSWORD: str

    SECRET_KEY: str
    ALGORITHM: str

    class Config:
        """Конфиг настроек БД"""

        extra = "ignore"
        env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".env")


def get_auth_data():
    """Возвращает данные для аутентификации пользователя"""
    return {"secret_key": settings.SECRET_KEY, "algorithm": settings.ALGORITHM}


def get_db_url():
    """Возвращает строку для подключения к БД"""
    return f"postgresql+asyncpg://{os.getenv('POSTGRE_USER')}:{os.getenv('POSTGRE_PASSWORD')}@{os.getenv('POSTGRE_HOST')}:{os.getenv('POSTGRE_PORT')}/{os.getenv('POSTGRE_DATABASE')}"


settings = Settings()


DATABASE_URL = get_db_url()
engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

# настройка аннотаций
int_pk = Annotated[int, mapped_column(primary_key=True)]
created_at = Annotated[datetime, mapped_column(server_default=func.now())]
updated_at = Annotated[datetime, mapped_column(server_default=func.now(), onupdate=datetime.now)]
str_uniq = Annotated[str, mapped_column(unique=True, nullable=False)]
str_null_true = Annotated[str, mapped_column(nullable=True)]


class Base(AsyncAttrs, DeclarativeBase):
    """Базовый класс для таблицы"""

    __abstract__ = True
    from_attributes = True

    @classmethod
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{cls.__name__.lower()}s"

    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    class Config:
        from_attributes = True
