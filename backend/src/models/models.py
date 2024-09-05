import os
import pickle
from typing import Optional

import redis
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from sqlalchemy.engine import Engine

from backend.config.database import async_session_maker
from backend.src.models.trie import Trie

load_dotenv()


qdrant_connection: Optional[QdrantClient] = None
embedder: Optional[SentenceTransformer] = None
redis_connection: Optional[redis.StrictRedis] = None
db_connection: Optional[Engine] = None
trie: Optional[Trie] = None


class CustomUnpickler(pickle.Unpickler):
    """Кастомный поисковик. Нужен, т.к базовый для fastapi не работает"""

    def find_class(self, module, name):
        """Искать класс"""
        if module == "__main__":
            module = "backend.src.models.trie"
        return super().find_class(module, name)


def custom_load(file_path):
    """Кастомная загрузка, которая ищет класс внутри своих модулей"""
    with open(file_path, "rb") as f:
        return CustomUnpickler(f).load()


def get_trie():
    """Метод для объекта для автокомплита"""
    global trie
    if trie is None:
        trie = custom_load(os.path.join(os.getcwd(), "data", "trie.pkl"))
    return trie


def get_qdrant_connection() -> QdrantClient:
    """Метод для получения подключения к Qdrant"""
    global qdrant_connection
    if qdrant_connection is None:
        qdrant_connection = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
    return qdrant_connection


def get_embedder() -> SentenceTransformer:
    """Метод для получения эмбеддера"""
    global embedder
    if embedder is None:
        embedder = SentenceTransformer(os.getenv("QDRANT_EMBEDDER"))
    return embedder


def get_redis_connection() -> redis.Redis:
    """Метод для получения подключения к Redis"""
    global redis_connection
    if redis_connection is None:
        redis_connection = redis.StrictRedis(
            host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("RESID_PASSWORD")
        )
    return redis_connection


def get_db_connection() -> Engine:
    """Метод для получения подключения к pgsql"""
    global db_connection
    if db_connection is None:
        db_connection = async_session_maker

    return db_connection
