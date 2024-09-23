build:
	@ARCH=$(shell uname -m); \
	max_attempts=3; \
	count=0; \
	until [ $$count -ge $$max_attempts ]; do \
		((count++)); \
		echo "Attempt $$count of $$max_attempts..."; \
		if [ "$$ARCH" = "riscv64" ]; then \
			echo "Building for RISC-V using Dockerfile.riscv..."; \
			sudo DOCKER_BUILDKIT=0 docker build -f Dockerfile.riscv -t space-single:v1.0.0 ./; \
		else \
			echo "Building for default architecture..."; \
			sudo DOCKER_BUILDKIT=0 docker build -t space-single:v1.0.0 ./; \
		fi; \
		if [ $$? -eq 0 ]; then \
			echo "Build succeeded."; \
			break; \
		fi; \
		if [ $$count -eq $$max_attempts ]; then \
			echo "Build failed after $$count attempts."; \
			exit 1; \
		fi; \
		echo "Build failed. Retrying..."; \
	done
run:
	sudo docker-compose up

stop:
	sudo docker-compose stop

remove:
	sudo docker-compose down