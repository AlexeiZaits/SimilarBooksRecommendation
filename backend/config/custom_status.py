from enum import Enum


class CustomHTTPStatus(int, Enum):
    """Enum, который хранит кастомные статусы HTTP запросов"""

    UnknownExceptionStatus = 1000  # Неизвестная ошибка
    RedisDataNotFouldStatus = 1001  # Данные не найдены в Redis по входящему запросу
    RankingErrorStatus = 1002  # Не найдены похожие книги
    AutocompliteIsEmptyStatus = 1003  # Не найдены походие книги в автокомплите
    QdrantSearchError = 1004  # Ошибка в поиске Qdrant или в построении эмбеддингов
