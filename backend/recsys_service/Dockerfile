FROM python:3.9-slim-bullseye

WORKDIR /app

COPY requirements_prod.txt .

RUN pip install --no-cache-dir -r requirements_prod.txt

COPY . /app/backend/recsys_service/

CMD ["uvicorn", "backend.recsys_service.app:app", "--port", "8003", "--host", "0.0.0.0"]
