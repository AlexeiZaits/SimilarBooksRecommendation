FROM python:3.11-slim

WORKDIR /app

COPY requirements_prod.txt .

RUN pip install --no-cache-dir -r requirements_prod.txt

COPY models /app/backend/models
COPY app.py /app/backend/app.py
COPY config /app/backend/config
COPY src /app/backend/src

CMD ["uvicorn", "backend.app:app", "--port", "8000", "--host", "0.0.0.0"]
