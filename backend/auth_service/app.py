from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

import backend.auth_service.src.models.models as models
from backend.auth_service.config.app_config import origins
from backend.auth_service.src.routers.api_auth import router as router_auth


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""

    models.db_connection = models.get_db_connection()
    instrumentator.expose(app)
    yield
    # Закрываем соединение


app = FastAPI(lifespan=lifespan)
instrumentator = Instrumentator().instrument(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_auth, prefix="/auth")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}


@app.get("/health")
def health() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200", "MESSAGE": "Здарова, Бандиты! Сервис авторизации готов."}
