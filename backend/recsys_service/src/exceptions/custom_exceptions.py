class CustomException(Exception):
    """Базовое исключение для пользовательских ошибок."""


class RedisDataNotFoundException(CustomException):
    """По запросу в Redis ничего не найдено"""

    default_message = "По запросу в Redis ничего не найдено"

    def __init__(self, message: str = default_message, errors=None):
        super().__init__(message)
        self.errors = errors
