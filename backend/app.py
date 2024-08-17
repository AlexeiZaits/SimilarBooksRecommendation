from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.src.models.models as models
from backend.config.app_config import origins
from backend.src.routers.api_general import router as router_general


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""
    models.embedder = models.get_embedder()
    models.qdrant_connection = models.get_qdrant_connection()
    models.redis_connection = models.get_redis_connection()
    models.trie = models.get_trie()
    yield
    models.redis_connection.close()
    models.qdrant_connection.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_general, prefix="/api")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}
