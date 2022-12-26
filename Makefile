# HOST=localhost:8000
HOST=192.168.178.48

.PHONY: dev
dev:
	http-server --proxy http://$(HOST) .
