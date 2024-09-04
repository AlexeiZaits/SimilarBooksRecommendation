# Используем базовый образ с Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл requirements.txt из корневой директории в текущую рабочую директорию в контейнере
COPY ../requirements_prod.txt .
# Устанавливаем зависимости
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements_prod.txt



# Копируем все файлы из текущей директории в рабочую директорию контейнера
COPY ../backend /app/backend
COPY ../data /app/data

# # Команда по умолчанию для запуска приложения (если нужно)
CMD ["uvicorn", "backend.app:app", "--port", "8000", "--host", "0.0.0.0"]
