from http import HTTPStatus
from typing import Optional

import redis

from backend.config.custom_status import CustomHTTPStatus
from backend.src.exceptions.custom_exceptions import RedisDataNotFoundException
from backend.src.schemas.tamplates import RedisMetadata, RedisResponse


def get_book_info_redis(name: str, redis_connection: redis.StrictRedis) -> Optional[RedisResponse]:
    """Получает данные и метаданные из Redis по ключу `name`"""

    # Формирование ключа для метаданных
    metadata_key = f"{name}:metadata"

    # Использование пайплайна для извлечения данных и метаданных
    with redis_connection.pipeline() as pipe:
        pipe.get(name)  # Запрос данных
        pipe.hgetall(metadata_key)  # Запрос метаданных

        responses = pipe.execute()

    # Извлечение данных и метаданных из ответов
    description = responses[0]
    if description is None:
        raise RedisDataNotFoundException(RedisDataNotFoundException.default_message + ". " + f"Запрос: {name}")

    metadata = responses[1]
    description = description.decode("utf-8")  #

    # Декодирование метаданных, если они существуют
    if metadata is not None:
        metadata = {key.decode("utf-8"): value.decode("utf-8") for key, value in metadata.items()}
    else:
        metadata = {}

    return RedisResponse(description=description, metadata=metadata, status=HTTPStatus.OK)


def get_description_by_title(title: str, redis_client: redis.StrictRedis) -> Optional[RedisResponse]:
    """Метод для получения данных и метаданных из Redis"""

    # Получаем описание по текущей книжке
    try:
        book_info = get_book_info_redis(redis_connection=redis_client, name=title)
        description = book_info.description
        metadata = RedisMetadata(category=book_info.metadata.category, author=book_info.metadata.author)
    # Если книжка не найдена
    except RedisDataNotFoundException:
        # TODO: логирование
        return RedisResponse(
            description="",
            metadata=RedisMetadata(category="", author=""),
            status=CustomHTTPStatus.RedisDataNotFouldStatus.value,
        )

    return RedisResponse(description=description, metadata=metadata, status=HTTPStatus.OK)
