import os

import pandas as pd
from langchain.vectorstores import FAISS

ROOT_PATH = os.getcwd()


def get_simillar_book(book_desc: str, index_db: FAISS, n_chunks: int = 5) -> str:
    """Поиск релевантных отрезков из базы знаний"""
    docs = index_db.similarity_search(book_desc, k=n_chunks)

    return docs


def inference(df: pd.DataFrame, book_desc: str, index_db: FAISS, n_chunks: int) -> dict[str, str]:
    """Метод для получения прогноза"""
    message_content = get_simillar_book(book_desc=book_desc, index_db=index_db, n_chunks=n_chunks)
    descs = [desc.page_content for desc in message_content]
    df = df[df["book_desc"].isin(descs)]
    return dict(zip(df["book_authors"].values, df["book_title"].values))


def load_df() -> pd.DataFrame:
    """Метод для загрузки датафрейма"""
    df = pd.read_csv(os.path.join(ROOT_PATH, "data", "book_data.csv")).drop_duplicates(subset=["book_desc"])
    df = df[df["book_desc"].astype(str).apply(len) < 1500]
    df["book_desc"] = df["book_desc"].fillna("")

    return df
