from typing import Optional

from dotenv import load_dotenv
from sqlalchemy.engine import Engine

from backend.auth_service.config.database import async_session_maker

load_dotenv()

db_connection: Optional[Engine] = None


def get_db_connection() -> Engine:
    """Метод для получения подключения к pgsql"""
    global db_connection
    if db_connection is None:
        db_connection = async_session_maker

    return db_connection
