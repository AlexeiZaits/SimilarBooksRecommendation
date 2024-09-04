import os

from dotenv import load_dotenv

load_dotenv()

# CORSMiddleware for FastAPI
origins = ["http://172.20.0.2:5173", "https://172.20.0.2:5173", "http://localhost:5173", "https://localhost:5173"]

# Строки подключения к базам данных
pgsql_connection_string = f"postgresql+psycopg2://{os.getenv('POSTGRE_USER')}:{os.getenv('POSTGRE_PASSWORD')}@{os.getenv('POSTGRE_HOST')}:{os.getenv('POSTGRE_PORT')}/{os.getenv('POSTGRE_DATABASE')}"
