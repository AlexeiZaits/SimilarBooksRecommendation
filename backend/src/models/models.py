import os
from typing import Optional

import redis
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

load_dotenv()


qdrant_connection: Optional[QdrantClient] = None
embedder: Optional[SentenceTransformer] = None
redis_connection: Optional[redis.StrictRedis] = None


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


def get_redis_connection() -> SentenceTransformer:
    """Метод для получения подключения к Redis"""
    global redis_connection
    if redis_connection is None:
        redis_connection = redis.StrictRedis(
            host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("RESID_PASSWORD")
        )
    return redis_connection
