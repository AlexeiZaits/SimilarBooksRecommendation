from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.src.models.models as models
from backend.config.app_config import origins
from backend.src.routers.api_recsys import router as router_recsys
from backend.src.routers.api_app import router as router_app


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""

    models.embedder = models.get_embedder()
    models.qdrant_connection = models.get_qdrant_connection()
    models.redis_connection = models.get_redis_connection()
    models.db_connection = models.get_db_connection()
    models.trie = models.get_trie()
    yield
    # Закрываем соединение
    models.redis_connection.close()
    models.qdrant_connection.close()
    models.db_connection.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_recsys, prefix="/recsys")
app.include_router(router_app, prefix="/app")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}
