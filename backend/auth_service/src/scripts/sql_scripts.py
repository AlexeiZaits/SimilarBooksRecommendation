from typing import Dict, Optional

from dotenv import load_dotenv
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.auth_service.src.models.tables import User

load_dotenv()


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
