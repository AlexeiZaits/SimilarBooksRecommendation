import os
from typing import Optional

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

load_dotenv()


qdrant: Optional[QdrantClient] = None
embedder: Optional[SentenceTransformer] = None


def get_qdrant_connection() -> QdrantClient:
    """Метод для получения подключения к Qdrant"""
    global qdrant
    if qdrant is None:
        qdrant = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
    return qdrant


def get_embedder() -> SentenceTransformer:
    """Метод для получения эмбеддера"""
    global embedder
    if embedder is None:
        embedder = SentenceTransformer(os.getenv("QDRANT_EMBEDDER"))
    return embedder
