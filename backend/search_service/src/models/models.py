import os
import pickle
from typing import Optional

import redis
from dotenv import load_dotenv
from sqlalchemy.engine import Engine

from backend.auth_service.config.database import async_session_maker
from backend.search_service.src.models.trie import Trie

load_dotenv()


redis_connection: Optional[redis.StrictRedis] = None
db_connection: Optional[Engine] = None
trie: Optional[Trie] = None


class CustomUnpickler(pickle.Unpickler):
    """Кастомный поисковик. Нужен, т.к базовый для fastapi не работает"""

    def find_class(self, module, name):
        """Искать класс"""
        if module == "__main__":
            module = "backend.search_service.src.models.trie"
        return super().find_class(module, name)


def custom_load(file_path):
    """Кастомная загрузка, которая ищет класс внутри своих модулей"""
    with open(file_path, "rb") as f:
        return CustomUnpickler(f).load()


def get_trie():
    """Метод для объекта для автокомплита"""
    global trie
    if trie is None:
        trie = custom_load(os.path.join(os.getcwd(), "backend", "search_service", "models", "trie.pkl"))
    return trie


def get_redis_connection() -> redis.Redis:
    """Метод для получения подключения к Redis"""
    global redis_connection
    if redis_connection is None:
        redis_connection = redis.StrictRedis(
            host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("REDIS_PASSWORD")
        )
    return redis_connection


def get_db_connection() -> Engine:
    """Метод для получения подключения к pgsql"""
    global db_connection
    if db_connection is None:
        db_connection = async_session_maker

    return db_connection
