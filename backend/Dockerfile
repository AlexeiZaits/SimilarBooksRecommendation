FROM python:3.9-slim-bullseye

WORKDIR /app

COPY requirements_prod.txt .

RUN pip install --no-cache-dir -r requirements_prod.txt

COPY . /app/backend/

CMD ["uvicorn", "backend.app:app", "--port", "8000", "--host", "0.0.0.0"]
