from enum import Enum


class CustomHTTPStatus(int, Enum):
    """Enum, который хранит кастомные статусы HTTP запросов"""

    UnknownExceptionStatus = 1000  # Неизвестная ошибка
    RedisDataNotFouldStatus = 1001  # Данные не найдены в Redis по входящему запросу
    QdrantSearchError = 1004  # Ошибка в поиске Qdrant или в построении эмбеддингов
