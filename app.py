from fastapi import FastAPI

from src.router import router

app = FastAPI()

app.include_router(router, prefix="/api")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    """Данный метод запускает по-умолчанию при запуске FASTAPI сервера"""
    return {"STATUS": "200"}
