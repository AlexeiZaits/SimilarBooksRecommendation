from enum import Enum


class CustomHTTPStatus(int, Enum):
    """Enum, который хранит кастомные статусы HTTP запросов"""

    UnknownExceptionStatus = 1000  # Неизвестная ошибка
    DataBaseError = 1005  # Ошибка при запросе к базе данных
    CategoryFilterIsNotFound = 1006  # Введенный в запрос фильтр отсутствует в данных
