import os

import yaml
from dotenv import load_dotenv

load_dotenv()

config_data = {
    "apiVersion": "v1",
    "kind": "ConfigMap",
    "metadata": {"name": "books-config"},
    "data": {
        # Qdrant config
        "QDRANT_URL": f"{os.getenv('QDRANT_URL')}",
        "QDRANT_COLLECTION_DESCRIPTION": f"{os.getenv('QDRANT_COLLECTION_DESCRIPTION')}",
        "QDRANT_COLLECTION_TITLES": f"{os.getenv('QDRANT_COLLECTION_TITLES')}",
        "QDRANT_EMBEDDER": f"{os.getenv('QDRANT_EMBEDDER')}",
        # Redis config
        "REDIS_HOST": f"{os.getenv('REDIS_HOST')}",
        "REDIS_PORT": f"{os.getenv('REDIS_PORT')}",
        # Postgre config
        "POSTGRE_HOST": f"{os.getenv('POSTGRE_HOST')}",
        "POSTGRE_PORT": f"{os.getenv('POSTGRE_PORT')}",
        "POSTGRE_DATABASE": f"{os.getenv('POSTGRE_DATABASE')}",
        "POSTGRE_BOOK_TABLE": f"{os.getenv('POSTGRE_BOOK_TABLE')}",
        "POSTGRE_USER_TABLE": f"{os.getenv('POSTGRE_USER_TABLE')}",
        # Backend config
        "BACKEND_PORT": f"{os.getenv('BACKEND_PORT')}",
    },
}

if __name__ == "__main__":
    with open(
        os.path.join(os.getcwd(), "k8s", "backend-manifests", "configmap.yaml"), "w", encoding="utf-8"
    ) as yaml_file:
        yaml.dump(config_data, yaml_file, default_flow_style=False)
