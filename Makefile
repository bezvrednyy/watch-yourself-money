build-dev-image:
	docker build -f Dockerfile.dev -t money-service-image .
dev:
	docker run -p 3000:3000 \
		-d \
		--rm \
		--name money-service \
		-v C:\Git-repositories\_volgatech-repositories\watch-yourself-money:/app \
		-v /app/node_modules \
		--env-file ./config/development.env \
		money-service-image
stop:
	docker stop money-service