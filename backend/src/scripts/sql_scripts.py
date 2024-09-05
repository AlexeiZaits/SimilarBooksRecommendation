import os
from http import HTTPStatus
from typing import Optional

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import text

# from sqlalchemy.engine import Engine
from backend.src.schemas.tamplates_app import BookInfo, BooksBatchResponse

load_dotenv()


async def get_books_batch(
    db_session, limit: int, offset: int, category_filter: Optional[str] = None
) -> BooksBatchResponse:
    """Возвращает из postgresql список книг батчами"""

    # Формируем весь запрос
    main_query = f"""SELECT * FROM {os.getenv('POSTGRE_BOOK_TABLE')} """
    filter_query = f"""WHERE "Category" = {category_filter} """ if category_filter else ""
    limit_query = f"""LIMIT {limit} OFFSET {offset}"""

    query = main_query + filter_query + limit_query

    # Выполняем асинхронный запрос к базе данных
    result = await db_session.execute(text(query))

    # Преобразуем результат в DataFrame
    df = pd.DataFrame(result.fetchall(), columns=result.keys()).to_dict(orient="records")
    books_info_list = [BookInfo(**book) for book in df]

    return BooksBatchResponse(books=books_info_list, status=HTTPStatus.OK)
