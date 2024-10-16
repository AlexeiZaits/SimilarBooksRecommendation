from datetime import datetime, timezone

from fastapi import HTTPException, Request, status
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from backend.auth_service.config.database import get_auth_data
from backend.auth_service.src.scripts.passwords import verify_password
from backend.auth_service.src.scripts.sql_scripts import get_user_by_login, get_user_by_uid


async def authenticate_user(db_connection: AsyncSession, login: str, password: str):
    """Метод для аутентификации пользователя по паролю"""
    user = await get_user_by_login(db_session=db_connection, login=login)

    if not user or verify_password(plain_password=password, hashed_password=user.password) is False:
        return None
    return user


def get_token(request: Request):
    """Метод достает JWT токен из cookie"""
    token = request.cookies.get("users_access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token not found")
    return token


async def get_current_user(db_connection: AsyncSession, token: str):
    """Проверяет токен пользователя и получает всю информацию о нем"""

    # получить из токена данные с которыми можно будет работать, это exp и sub.
    try:
        auth_data = get_auth_data()
        payload = jwt.decode(token, auth_data["secret_key"], algorithms=[auth_data["algorithm"]])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Токен не валидный!") from exc

    # проверим срок токена (истек или не истек)
    expire = payload.get("exp")  # Забираем значение:
    expire_time = datetime.fromtimestamp(int(expire), tz=timezone.utc)  # Трансформируем в нужный формат:
    if (not expire) or (expire_time < datetime.now(timezone.utc)):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Токен истек")

    # проверяем есть ли параметр ID пользователя:
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Не найден ID пользователя")

    # получаем данные о пользователе:
    user = await get_user_by_uid(db_session=db_connection, uid=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user


async def get_current_admin_user(db_connection: AsyncSession, token: str):
    """Получает данные админа. Тестовый метод"""
    current_user = await get_current_user(db_connection, token)

    if current_user.is_admin:
        return current_user
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Недостаточно прав!")
