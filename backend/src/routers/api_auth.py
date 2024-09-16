# from app.exceptions import ForbiddenException, NoJwtException, NoUserIdException, TokenExpiredException

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.models.models import get_db_connection
from backend.src.schemas.templates_auth import UserAuth, UserRegister
from backend.src.scripts.auth import authenticate_user, get_current_admin_user, get_current_user, get_token
from backend.src.scripts.passwords import create_access_token, get_password_hash
from backend.src.scripts.sql_scripts import create_user, get_user_by_login

router = APIRouter(tags=["Authorization and Authentification"])


@router.post("/register")
async def register_user(
    user_data: UserRegister,
    db_connection=Depends(get_db_connection),
) -> dict:
    """Endpoint, который регистрирует пользователя, если он еще не зарегистрирован"""

    user = await get_user_by_login(db_session=db_connection, login=user_data.login)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь с таким логином уже существует")

    # Если всё окей, то запускай
    user_dict = user_data.model_dump()
    user_dict["password"] = get_password_hash(user_data.password)
    result = await create_user(db_session=db_connection, user_dict=user_dict)
    if result:
        return {"message": "Вы успешно зарегистрированы!"}

    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь не был зарегистрирован")


@router.post("/login")
async def auth_user(
    response: Response,
    user_data: UserAuth,
    db_connection=Depends(get_db_connection),
):
    """Endpoint для того, чтобы пользователь залогинился"""

    # Проходим аутентификацию
    check = await authenticate_user(db_connection=db_connection, login=user_data.login, password=user_data.password)
    if check is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный логин или пароль")

    # Создаем JWT токен и записывает его в cookie
    access_token = create_access_token({"sub": str(check.uid)})
    response.set_cookie(
        key="users_access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="None",
        # max_age=timedelta(days=7),
    )
    # TODO: кидать метод /user

    # Рефреш токен тоже генерировать
    return {"access_token": access_token, "refresh_token": None}


@router.post("/logout")
async def logout_user(response: Response):
    """Метод, позволяющий пользователю разлогиниться"""

    response.delete_cookie(key="users_access_token")
    return {"message": "Пользователь успешно вышел из системы"}


@router.get("/user")
async def get_me(
    token: str = Depends(get_token),
    db_connection: AsyncSession = Depends(get_db_connection),
):
    """Получить данные о пользователе, если он зарегистрирован и имеет JWT токеном"""

    return await get_current_user(db_connection=db_connection, token=token)


@router.get("/admin_test")
async def admin_test(
    token: str = Depends(get_token),
    db_connection: AsyncSession = Depends(get_db_connection),
):
    """Тестовый метод только для админа"""

    user = await get_current_admin_user(token=token, db_connection=db_connection)
    return {"message", "Абоба, Бебра, Абульбахаб"}
