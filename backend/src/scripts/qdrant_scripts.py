from typing import Any, List

from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer


def qdrant_search(
    query: str,
    embedder: SentenceTransformer,
    qdrant_client: QdrantClient,
    collection_name: str,
    limit: int,
    offset: int,
) -> List[Any]:
    """Векторный поиск Qdrant"""
    query_vector = embedder.encode(query, batch_size=1, normalize_embeddings=True)
    content = qdrant_client.search(
        collection_name=collection_name, query_vector=query_vector, limit=limit, offset=offset
    )
    return content
