from http import HTTPStatus
from typing import Optional

import redis

from backend.src.exceptions.custom_exceptions import RedisDataNotFoundException
from backend.src.schemas.tamplates import RedisResponse


def get_book(name: str, redis_connection: Optional[redis.StrictRedis]) -> Optional[RedisResponse]:
    """Получает описание книги и метаданные из Redis по ключу `name`"""

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
