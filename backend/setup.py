import subprocess


def run_command(command: str) -> None:
    """Выполняет указанную команду"""
    subprocess.run(command, shell=True, check=True)


def setup() -> None:
    """Собирает проект полностью"""
    # 1. Обновить pip
    run_command("python -m pip install --upgrade pip")

    # 2. Установить зависимости для poetry
    run_command("pip install -r requirements.txt")

    # 3. Установить остальные зависимости с помощью poetry
    run_command("poetry install")

    # # 4. Заполнить config для dvc
    # run_command("python .dvc/setup_dvc.py")

    # # 5. Подгрузить актуальные модели и датасеты из s3
    # run_command("dvc pull")

    # 6. Активировать pre-commits
    run_command("poetry run pre-commit install")


if __name__ == "__main__":
    setup()
