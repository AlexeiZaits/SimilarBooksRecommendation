from http import HTTPStatus
from typing import Dict, Optional

from dotenv import load_dotenv
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.src.models.tables import Book, User
from backend.src.schemas.tamplates_app import BookInfo, BooksBatchResponse

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

        # Получаем все книги из результата запроса и преобразовываем его в нужный вид
        books_info_list = [BookInfo(**book.to_dict()) for book in result.scalars().all()]

        return BooksBatchResponse(books=books_info_list, status=HTTPStatus.OK)


async def get_user_by_login(db_session: AsyncSession, login: str) -> Optional[User]:
    """Возвращает пользователя по полю login из базы данных."""

    # Формируем запрос
    query = select(User).where(User.login == login)

    async with db_session() as session:
        # Выполняем асинхронный запрос
        result = await session.execute(query)

        # Получаем первый результат (если есть)
        user = result.scalars().first()

        return user


async def get_user_by_uid(db_session: AsyncSession, uid: str) -> Optional[User]:
    """Возвращает пользователя по полю uid из базы данных."""

    # Формируем запрос
    query = select(User).where(User.uid == uid)

    async with db_session() as session:
        # Выполняем асинхронный запрос
        result = await session.execute(query)

        # Получаем первый результат (если есть)
        user = result.scalars().first()

        return user


async def create_user(db_session: AsyncSession, user_dict: Dict[str, str]) -> bool:
    """Создает нового пользователя в базе данных.
    user_dict ожидает поля: login, password и другие необходимые поля.
    """

    query = insert(User).values(user_dict)

    async with db_session() as session:
        # Создаем нового пользователя
        try:
            await session.execute(query)
            await session.commit()  # Подтверждаем изменения
            return True  # Пользователь успешно создан
        except IntegrityError as e:
            await session.rollback()  # Откатываем транзакцию при ошибке
            # Логирование или обработка ошибки, если необходимо
            return False  # Возможно, пользователь с таким login уже существует
