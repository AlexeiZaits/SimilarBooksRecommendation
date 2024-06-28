from fastapi import FastAPI
from app.src.router import router

app = FastAPI()

app.include_router(router, prefix="/api")


# create a route
@app.get("/")
def index() -> dict[str, str]:
    return {"text": "Probability predict"}
