import os

from dotenv import load_dotenv

load_dotenv()

# CORSMiddleware for FastAPI
origins = ["http://172.20.0.2:5173", "https://172.20.0.2:5173", "http://localhost:5173", "https://localhost:5173"]



def get_auth_data():
    """Получает данные для авторизации"""
    return {"secret_key": os.getenv("SECRET_KEY"), "algorithm": os.getenv("ALGORITHM")}
