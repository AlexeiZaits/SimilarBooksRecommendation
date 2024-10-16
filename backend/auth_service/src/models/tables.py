import os
import uuid

from dotenv import load_dotenv
from sqlalchemy import Boolean, Column, String
from sqlalchemy.dialects.postgresql import UUID

from backend.auth_service.config.database import Base

load_dotenv()


class User(Base):
    """Шаблон таблицы для пользователей"""

    __tablename__ = f"{os.getenv('POSTGRE_USER_TABLE')}"

    uid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    login = Column(String)
    password = Column(String)
    is_user = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    is_super_admin = Column(Boolean, default=False)

    extend_existing = True

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.uid})"
