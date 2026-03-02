FRONTEND_DIR = ./web
BACKEND_DIR = .

.PHONY: all build build-frontend start-backend

all: build-frontend start-backend

# 先构建前端再编译后端，生成带前端的二进制（Windows 下为 new-api.exe）
build: build-frontend
	@echo "Building backend with embedded frontend..."
	@cd $(BACKEND_DIR) && go build -o new-api .

build-frontend:
	@echo "Building frontend..."
	@cd $(FRONTEND_DIR) && bun install && DISABLE_ESLINT_PLUGIN='true' VITE_REACT_APP_VERSION=$$(cat VERSION 2>/dev/null || echo "v0.0.0") bun run build

start-backend:
	@echo "Starting backend dev server..."
	@cd $(BACKEND_DIR) && go run main.go &
