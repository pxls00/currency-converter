create:
	docker build . -t currency-converter
delete:
	docker rmi currency-converter
run:
	docker run -d -p 8080:80 --rm --name currency-converter_container currency-converter
stop:
	docker stop currency-converter_container