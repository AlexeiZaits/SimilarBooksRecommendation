from typing import Dict, Optional

import redis


# TODO: output = TypedDict
def fetch_data_and_metadata(redis_connection: redis.StrictRedis, name: str) -> Optional[Dict[str, Optional[str]]]:
    """
    Получает данные и метаданные из Redis по ключу `name`.

    :param redis_connection: Подключение к Redis.
    :param name: Ключ для извлечения данных и метаданных.
    :return: Словарь с данными и метаданными.
    """
    # Формирование ключа для метаданных
    metadata_key = f"{name}:metadata"

    # Использование пайплайна для извлечения данных и метаданных
    with redis_connection.pipeline() as pipe:
        # Запрос данных
        pipe.get(name)
        # Запрос метаданных
        pipe.hgetall(metadata_key)

        # Выполнение всех команд в пайплайне
        responses = pipe.execute()

    # Извлечение данных и метаданных из ответов
    description = responses[0]
    if description is None:
        # TODO: Собственное исключение
        return None

    metadata = responses[1]

    # Декодирование данных, если они существуют
    description = description.decode("utf-8")  # Декодирование байтов в строку

    # Декодирование метаданных, если они существуют
    if metadata is not None:
        metadata = {k.decode("utf-8"): v.decode("utf-8") for k, v in metadata.items()}
    else:
        metadata = {}

    return {"description": description, "metadata": metadata}
