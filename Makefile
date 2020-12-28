APP_NAME := "calculator-ui"

build:
	docker build . -t ${APP_NAME}

start:
	docker run -p 3000:3000 --name ${APP_NAME} --rm ${APP_NAME}:latest
