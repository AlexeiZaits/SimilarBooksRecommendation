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
}

if __name__ == "__main__":
    with open(
        os.path.join(os.getcwd(), "k8s", "backend-manifests", "secrets.yaml"), "w", encoding="utf-8"
    ) as yaml_file:
        yaml.dump(secrets_data, yaml_file, default_flow_style=False)
