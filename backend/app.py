from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.src.models
from backend.config.app_config import origins
from backend.src.router import router


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""
    backend.src.models.embedder = backend.src.models.get_embedder()
    backend.src.models.qdrant_connection = backend.src.models.get_qdrant_connection()
    backend.src.models.redis_connection = backend.src.models.get_redis_connection()
    yield
    # Здесь можно добавить действия при завершении работы приложения


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}
