import os
from http import HTTPStatus
from typing import Optional

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy.engine import Engine

from backend.src.schemas.tamplates_app import BookInfo, BooksBatchResponse

load_dotenv()


def get_books_batch(
    engine: Engine, limit: int, offset: int, category_filter: Optional[str] = None
) -> BooksBatchResponse:
    """Возвращает из postgresql список книг батчами"""

    # Формируем весь запрос:
    main_query = f"""SELECT * FROM {os.getenv('POSTGRE_BOOK_TABLE')} """
    filter_query = f"""WHERE "Category" = '{category_filter}' """ if category_filter else ""
    limit_query = f"""LIMIT {limit} OFFSET {offset};"""

    query = main_query + filter_query + limit_query

    # Запрос в БД через sqlalchemy
    df = pd.read_sql(query, engine)
    books_info_list = [BookInfo(**book) for book in df.to_dict(orient="records")]

    return BooksBatchResponse(books=books_info_list, status=HTTPStatus.OK)
