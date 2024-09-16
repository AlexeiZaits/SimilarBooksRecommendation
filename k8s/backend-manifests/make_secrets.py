import base64
import os

import yaml
from dotenv import load_dotenv

load_dotenv()


def encode_base64(value):
    """Метод для base64 кодирования k8s Secret значений"""
    return base64.b64encode(value.encode("utf-8")).decode("utf-8")


secrets_data = {
    "apiVersion": "v1",
    "kind": "Secret",
    "metadata": {"name": "books-secrets"},
    "type": "Opaque",
    "data": {
        # Qdrant config
        "QDRANT_API_KEY": f"{encode_base64(os.getenv('QDRANT_API_KEY'))}",
        # Redis config
        "REDIS_PASSWORD": f"{encode_base64(os.getenv('REDIS_PASSWORD'))}",
        # Postgre config
        "POSTGRE_USER": f"{encode_base64(os.getenv('POSTGRE_USER'))}",
        "POSTGRE_PASSWORD": f"{encode_base64(os.getenv('POSTGRE_PASSWORD'))}",
        # Auth config
        "SECRET_KEY": f"{encode_base64(os.getenv('SECRET_KEY'))}",
        "ALGORITHM": f"{encode_base64(os.getenv('ALGORITHM'))}",
    },
}

if __name__ == "__main__":
    with open(
        os.path.join(os.getcwd(), "k8s", "backend-manifests", "secrets.yaml"), "w", encoding="utf-8"
    ) as yaml_file:
        yaml.dump(secrets_data, yaml_file, default_flow_style=False)
