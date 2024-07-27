## Чтобы запустить проект локально:
1. Установите python 3.11.0 и выше
2. Склонировать репозиторий: ``git clone https://github.com/AlexeiZaits/SimilarBooksRecommendation.git``
3. Создать виртуальное окружение: ``python -m venv venv``
4. Активироавть виртуальное окружение: ``venv\Scripts\activate`` (для windows)
5. Заполните ``.env`` файл:
6. Соберите проект: ``python setup.py``
7. Запустите fastapi сервер: ``poetry run uvicorn backend.app:app --reload``

```
# Описание .env:
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION_NAME=
QDRANT_EMBEDDER=
```

## Принцип ведения git:

Во время разработки следует следует создавать новые ветки из ``main``.

1. Чтобы создать новый функционал пишем коммит ``init: _description_``

2. Чтобы пофиксить баг пишем коммит ``fix: _description_``

2. Чтобы изменить что-то пишем коммит ``upd: _description_``


## Полезные git команды:
1. ``git checkout -b branch_name`` - создать ветку и переключиться на нее
2. ``git branch`` - отобразить все существующие ветки
3. ``git push -u origin new branch``  - отправить новую ветку в удаленный репозиторий
4. ``git reset -soft HEAD~1`` - удалить последний 1 коммит, но сохранить изменения
5. ``git branch -d <branch-name>`` - удалить ветку из локального репозиторию
6. ``git checkout current_branch`` ``->`` ``git merge target_branch`` – подтянуть изменения из ``target_branch`` ветки в ``current_branch``
7. ``git checkout --track -b local_branch_name origin/remote_branch_name`` – Чтобы склонировать конкретную существующую в удаленном репозитории ветку, нужно ввести команду
8. ``git rm --cached filename`` (если директория, то ``-r filename``) – удалить что-то из всевидящего GIT - ока:

## Полезные команды Poetry:
1. ``poetry update`` - обновить зависимость по pyproject.toml файлу
2. ``poetry install`` - установить все зависимости по pyproject.toml и poetry.lock файлам
3. ``poetry add --group group_name lib_name`` - добавить библиотеку в зависимости (``--group group_name`` - не обязательно)
4. ``poetry remove lib_name`` - удалить библиотеку из зависимостей
5. ``poetry run pre-commit run --all-files`` - запустить pre-commit хуки

## Полезные команды DVC:
1. ``dvc init`` - инициализировать все dvc файлы
2. ``dvc add path/to/...`` - добавить в dvc папку/файл
3. ``dvc commit`` - Фиксирует изменения
4. ``dvc push `` - загрузить измененные данные в s3
5. ``dvc pull`` - выгрузить данные из s3
6. ``dvc remote list`` - показать список доступных хранилищ
7. ``dvc diff`` - показать разницу между предыдущими версиями
8. ``dvc checkout`` - восстановить данные из предыдущего коммита

## Полезные команды Docker:
1. ``docker-compose down -v`` - (удалить контейнеры, включая volumes)
2. ``docker-compose down`` - (удалить контейнеры)
3. ``docker-compose build --no-cache`` - пересобрать, не используя кэш
4. ``docker-compose build`` - пересобрать
5. ``docker-compose up -d`` - запустить в detouch моде (логи не отображаются в консоли)
6. ``docker-compose up -d --build`` - запустить в detouch моде и пересобрать
7. ``docker ps`` - вывести список запущенных контейнеров
