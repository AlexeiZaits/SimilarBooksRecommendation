from dotenv import load_dotenv

load_dotenv()

# CORSMiddleware for FastAPI
origins = [
    "http://172.20.0.2:5173",
    "https://172.20.0.2:5173",
    "http://localhost:5173",
    "https://localhost:5173",
    "http://127.0.0.1:5173",
    "https://127.0.0.1:5173",
    "https://83.166.232.242:5173",
    "http://83.166.232.242:5173",
]
