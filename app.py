from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.router import router


@asynccontextmanager
async def lifespan(App: FastAPI):
    """Запуск загрузки модели и эмбеддера в фоновом режиме при старте приложения"""
    # TODO: реализовать фоновый запуск
    yield
    # Здесь можно добавить действия при завершении работы приложения


app = FastAPI(lifespan=lifespan)

app.include_router(router, prefix="/api")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}
