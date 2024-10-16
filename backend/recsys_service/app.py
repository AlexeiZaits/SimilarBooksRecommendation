from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

import backend.recsys_service.src.models.models as models
from backend.recsys_service.config.app_config import origins
from backend.recsys_service.src.routers.api_recsys import router as router_recsys


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""

    models.embedder = models.get_embedder()
    models.qdrant_connection = models.get_qdrant_connection()
    instrumentator.expose(app)
    yield
    # Закрываем соединение
    models.qdrant_connection.close()


app = FastAPI(lifespan=lifespan)
instrumentator = Instrumentator().instrument(app, metric_namespace="backend", metric_subsystem="recsys_service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_recsys, prefix="/recsys")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}


@app.get("/health")
def health() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200", "MESSAGE": "Здарова, Бандиты! Сервис рекомендаций готов."}
