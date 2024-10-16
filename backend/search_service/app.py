from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

import backend.search_service.src.models.models as models
from backend.search_service.config.app_config import origins
from backend.search_service.src.routers.api_search import router as router_search


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""

    models.redis_connection = models.get_redis_connection()
    models.db_connection = models.get_db_connection()
    models.trie = models.get_trie()
    instrumentator.expose(app)
    yield
    # Закрываем соединение
    models.redis_connection.close()


app = FastAPI(lifespan=lifespan)
instrumentator = Instrumentator().instrument(app, metric_namespace='backend', metric_subsystem='search_service')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_search, prefix="/search")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}


@app.get("/health")
def health() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200", "MESSAGE": "Здарова, Бандиты! Поисковый сервис готов."}
