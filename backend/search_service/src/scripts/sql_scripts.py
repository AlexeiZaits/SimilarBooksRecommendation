from http import HTTPStatus
from typing import Optional

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.search_service.src.models.tables import Book
from backend.search_service.src.schemas.tamplates_app import BookInfo, BooksBatchResponse

load_dotenv()


async def get_books_batch(
    db_session: AsyncSession, limit: int, offset: int, category_filter: Optional[str] = None
) -> BooksBatchResponse:
    """Возвращает из postgresql список книг батчами"""

    # Формируем запрос
    query = select(Book).limit(limit).offset(offset)

    if category_filter:
        query = select(Book).where(Book.Category == category_filter).limit(limit).offset(offset)

    async with db_session() as session:
        # Выполняем асинхронный запрос
        result = await session.execute(query)
        result = [book.to_dict() for book in result.scalars().all()]

        # Получаем все книги из результата запроса и преобразовываем его в нужный вид
        books_info_list = [
            BookInfo(
                uid=book["ID"],
                image_link=book["Image"],
                category=book["Category"],
                author=book["Author"],
                title=book["Title"],
            )
            for book in result
        ]

        return BooksBatchResponse(data=books_info_list, status=HTTPStatus.OK)
