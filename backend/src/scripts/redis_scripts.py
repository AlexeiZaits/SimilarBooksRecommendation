from typing import Optional

import redis

from backend.src.schemas.tamplates import RedisResponse


def fetch_data_and_metadata(redis_connection: redis.StrictRedis, name: str) -> Optional[RedisResponse]:
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
        # TODO: Собственное исключение
        return None

    metadata = responses[1]
    description = description.decode("utf-8")  #

    # Декодирование метаданных, если они существуют
    if metadata is not None:
        metadata = {key.decode("utf-8"): value.decode("utf-8") for key, value in metadata.items()}
    else:
        metadata = {}

    return RedisResponse(description=description, metadata=metadata)
