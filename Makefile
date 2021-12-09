build-dev-image:
	docker build -f Dockerfile.dev -t money-service-image .
dev:
	docker run -p 3000:3000 \
		-d \
		--rm \
		--name money-service \
		-v /home/pschester/chester-env/repositories/watch-yourself-money:/app \
		-v /app/node_modules \
		--env-file ./config/development.env \
		money-service-image
postgres:
	docker run -p 5432:5432 \
		-d \
		--rm \
		--name money-postgres \
		--env-file ./config/development.env \
		postgres
stop:
	docker stop money-service