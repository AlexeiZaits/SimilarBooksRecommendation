.PHONY: install configmap secrets apply port-forward

# Установка зависимостей
install:
	pip install python-dotenv

# Генерация ConfigMap
configmap:
	python k8s/backend-manifests/make_configmap.py

# Генерация Secret
secrets:
	python k8s/backend-manifests/make_secrets.py

# Применение манифестов Kubernetes
apply: configmap secrets
	kubectl apply -f ./k8s/backend-manifests

# Проброс порта
port-forward:
	kubectl port-forward svc/books-service 8000:8000

# Полный запуск всех шагов
run: install apply port-forward
