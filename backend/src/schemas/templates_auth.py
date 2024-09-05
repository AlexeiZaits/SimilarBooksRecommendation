from pydantic import BaseModel, Field


class UserRegister(BaseModel):
    """Шаблон входных данных для регистрации пользователя"""

    login: str = Field(..., description="Логин")
    password: str = Field(..., min_length=5, max_length=50, description="Пароль, от 5 до 50 знаков")
