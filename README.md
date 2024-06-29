## Чтобы запустить проект локально:
1. Установите python 3.10.8 и выше
2. Склонировать репозиторий: ``git clone ...``
3. Создать виртуальное окружение: ``python -m venv venv``
4. Активироавть виртуальное окружение: ``venv\Scripts\activate`` (для windows)
5. Заполните ``.env`` файл:
6. Соберите проект: ``python setup.py``

```
# Описание .env:
S3_API_HOST=your_api_host
S3_BUCKET_NAME=your_bucket_name
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
DVC_USE_SSL=True
DVC_REMOTE_URL=s3://your_bucket_name
DVC_REMOTE_NAME=minio
```

## Принцип ведения git:

Во время разработки следует следует создавать новые ветки из ``dev``.

1. Чтобы создать новый функционал, создаем ветку ``init: _description_`` от ``dev``.

2. Чтобы пофиксить баг создаем ветку ``fix: _description_`` от ``dev``

2. Чтобы добавить что-то создаем ветку ``add: _description_`` от ``dev``


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
