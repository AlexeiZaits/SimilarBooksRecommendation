import os
from typing import Optional

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

load_dotenv()


_qdrant: Optional[QdrantClient] = None
_embedder: Optional[SentenceTransformer] = None


def get_qdrant_connection() -> Optional[QdrantClient]:
    """Метод для получения подключения к Qdrant"""
    global _qdrant
    if _qdrant is None:
        _qdrant = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
    return _qdrant


def get_embedder() -> Optional[SentenceTransformer]:
    """Метод для получения эмбеддера"""
    global _embedder
    if _embedder is None:
        _embedder = SentenceTransformer(os.getenv("QDRANT_EMBEDDER"))
    return _embedder
