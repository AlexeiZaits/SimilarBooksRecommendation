import os

import yaml
from dotenv import load_dotenv

load_dotenv()

config_data = {
    "apiVersion": "v1",
    "kind": "ConfigMap",
    "metadata": {"name": "books-config"},
    "data": {"NODE_ENV": "development"},
}

if __name__ == "__main__":
    with open(
        os.path.join(os.getcwd(), "k8s", "backend-manifests", "configmap.yaml"), "w", encoding="utf-8"
    ) as yaml_file:
        yaml.dump(config_data, yaml_file, default_flow_style=False)
