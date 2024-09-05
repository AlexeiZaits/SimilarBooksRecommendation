from fastapi import APIRouter, Depends, HTTPException, status

from backend.src.models.models import get_db_connection
from backend.src.schemas.templates_auth import UserRegister
from backend.src.scripts.passwords import get_password_hash
from backend.src.scripts.sql_scripts import create_user, get_user_by_login

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register/")
async def register_user(
    user_data: UserRegister,
    db_connection=Depends(get_db_connection),
) -> dict:
    """Endpoint, которые регистрирует пользователя, если он еще не зарегистрирован"""
    # TODO: если пользователь уже существует, то нужно это проверить. + email заменить на логин
    user = await get_user_by_login(db_session=db_connection, login=user_data.login)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь с таким логином уже существует")
    print("Пользователь не найден")
    # Если всё окей, то запускай
    user_dict = user_data.model_dump()
    user_dict["password"] = get_password_hash(user_data.password)
    result = await create_user(db_session=db_connection, user_dict=user_dict)
    if result:
        return {"message": "Вы успешно зарегистрированы!"}

    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь не был зарегистрирован")
