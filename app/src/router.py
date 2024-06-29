from http import HTTPStatus

import joblib
from fastapi import APIRouter

from app.src.faiss_scripts import inference, load_df
from app.src.schemas import BooksResponse

router = APIRouter(tags=["ML API"])
df = load_df()
vector_db = joblib.load("models/vector_db.pkl")


# Запрос для предикта Any = Body(None)
@router.post("/inference", response_model=BooksResponse)  #
def predict(book_desc: str):
    """Метод для получения инференса по api"""
    if vector_db:
        result = inference(df, book_desc, vector_db, n_chunks=6)
        print(result)
    return {"status": HTTPStatus.OK, "data": result}
