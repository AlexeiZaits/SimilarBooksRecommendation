class CustomException(Exception):
    """Базовое исключение для пользовательских ошибок."""


class DataBaseException(CustomException):
    """По запросу в Redis ничего не найдено"""

    default_message = "Ошибка во время запроса к БД"

    def __init__(self, message: str = default_message, errors=None):
        super().__init__(message)
        self.errors = errors
