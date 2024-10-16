import os

from dotenv import load_dotenv
from sqlalchemy import Column, String, Text

from backend.search_service.config.database import Base

load_dotenv()


class Book(Base):
    """Шаблон таблицы для книг"""

    __tablename__ = f"{os.getenv('POSTGRE_BOOK_TABLE')}"  # Задаем имя таблицы в базе данных

    ID = Column(String, primary_key=True)  # Первичный ключ
    Title = Column(String)  # Строка с максимальной длиной 255 символов
    Author = Column(String)  # Строка с максимальной длиной 255 символов
    Link = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Image = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Category = Column(String)  # Строка с максимальной длиной 255 символов, может быть пустой
    Description = Column(Text)  # Текст без ограничения длины
    Info = Column(Text)  # Текст без ограничения длины

    def __repr__(self):
        return f"{self.__class__.__name__}(ID={self.ID}, Title={self.Title})"
