.PHONY: dev-run clean-docker

dev-run: clean-docker
	@echo "--- Spring Boot 애플리케이션 빌드 ---"
	./gradlew clean bootJar
	@echo "--- Docker 이미지 새로 빌드 (캐시 무시) ---"
	docker-compose build --no-cache
	@echo "--- Docker Compose로 컨테이너 실행 ---"
	docker-compose up

clean-docker:
	@echo "--- 기존 Docker 컨테이너 및 볼륨 제거 ---"
	docker-compose down -v