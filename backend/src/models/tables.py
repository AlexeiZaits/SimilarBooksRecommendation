import os
import uuid

from dotenv import load_dotenv
from sqlalchemy import Boolean, Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped

from backend.config.database import Base

load_dotenv()


class User(Base):
    """Шаблон таблицы для пользователей"""

    uid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    login = Column(String)
    password = Column(String)
    is_user = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    is_super_admin = Column(Boolean, default=False)

    extend_existing = True

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.uid})"


class Book(Base):
    """Шаблон таблицы для книг"""

    __tablename__ = f"{os.getenv('POSTGRE_BOOK_TABLE')}"  # Задаем имя таблицы в базе данных

    ID: Mapped[str] = Column(primary_key=True, index=True)  # Первичный ключ
    Title: Mapped[str] = Column(String)  # Строка с максимальной длиной 255 символов
    Author: Mapped[str] = Column(String)  # Строка с максимальной длиной 255 символов
    Link: Mapped[str] = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Image: Mapped[str] = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Category: Mapped[str] = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Description: Mapped[str] = Column(Text)  # Текст без ограничения длины
    Info: Mapped[str] = Column(Text)  # Текст без ограничения длины

    def __repr__(self):
        return f"{self.__class__.__name__}(ID={self.ID}, Title={self.Title})"
