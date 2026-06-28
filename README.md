# hxxnewapi

hxx-new-api 大模型接口网关  

仓库: https://github.com/13560440305/hxxnewapi

---

## 一、Docker 容器编译与运行

### 1. 克隆仓库

```bash
git clone https://github.com/13560440305/hxxnewapi.git
cd hxxnewapi
```

### 2. 构建镜像

```bash
docker build -t hxxnewapi:latest .
```

指定版本号（需项目根目录存在 `VERSION` 文件或构建参数）：

```bash
docker build -t hxxnewapi:v1.0.0 --build-arg VERSION=v1.0.0 .
```

多架构构建（如 arm64）：

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t hxxnewapi:latest .
```

### 3. 运行容器

仅运行应用（需自行准备数据库与 Redis，或使用下方 docker-compose）：

```bash
docker run -d --name hxxnewapi -p 3000:3000 \
  -v ./data:/data \
  -e SQL_DSN="sqlite:/data/sqlite.db" \
  -e REDIS_CONN_STRING=redis://host.docker.internal:6379/0 \
  hxxnewapi:latest
```

访问：http://localhost:3000

### 4. 使用 Docker Compose（推荐）

一键启动应用 + Redis + PostgreSQL：

```bash
docker-compose up -d --build
```

- 首次会先构建镜像再启动，之后可直接 `docker-compose up -d`。
- 数据目录：当前目录下 `./data`、`./logs`。
- 访问：http://localhost:3000

停止并删除容器：

```bash
docker-compose down
```

---

## 二、本地开发与启动

> 详细步骤见 [docs/cn/本地开发与启动.md](./docs/cn/本地开发与启动.md)

### 前置条件

- Go ≥ 1.22
- Bun（前端）
- MySQL 8 + Redis（或仅用 SQLite，不配置 `SQL_DSN` / `REDIS_CONN_STRING` 即可）

### 配置 `.env`

```bash
cp .env.example .env
# 编辑 SQL_DSN、REDIS_CONN_STRING 等，参见 .env.example 注释
```

MySQL 需先创建库：

```sql
CREATE DATABASE hxxnewapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 启动命令

**首次启动前必须先构建前端**（后端通过 `go:embed` 嵌入 `web/dist`，目录不存在会报错 `pattern web/dist: no matching files found`）：

```bash
cd web
bun install
bun run build
cd ..
```

**仅后端（默认端口 3000）：**

```bash
go run main.go
```

访问：http://localhost:3000

**前后端分离开发（前端热更新）：**

```bash
# 终端 1
go run main.go

# 终端 2
cd web && bun install && bun run dev
```

访问：http://localhost:5173

**编译为单文件后运行：**

```bash
make build
./new-api          # Linux/macOS
# 或 Windows: .\new-api.exe
```

首次无用户时默认管理员：`root` / `123456`。

### 前端（web/）

| 操作     | 命令 |
|----------|------|
| 安装依赖 | `cd web && bun install` |
| 开发运行 | `cd web && bun run dev` |
| 编译打包 | `cd web && bun run build` |

### 后端（项目根目录）

| 操作     | 命令 |
|----------|------|
| 开发运行 | `go run main.go` |
| 编译打包 | `go build -o new-api .`（Windows 下生成 `new-api.exe`） |

### 一键：先编译前端再编译后端

```bash
make build
```

生成的可执行文件会内嵌 `web/dist`，直接运行即可提供完整服务。

// 创建桥接网络
docker network create hxxnet

// 查看桥接网络信息
docker network ls

// 删除网络
docker network rm hxxnet


// mysql 运行容器命令
docker run -d \
  --name mysql8 \
  --network hxxnet \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -p 3306:3306 \
  mysql:8.0

// redis 运行容器命令
docker rm -f redisd

docker run -d \
  --name redisd \
  --network hxxnet \
  -p 6379:6379 \
  -v /data/redis:/data \
  --restart always \
  redis:latest \
  redis-server --requirepass "123456"

# hxxnewapid
docker run -d \
  --name hxxnewapid \
  --network hxxnet \
  -p 3000:3000 \
  hxxnewapi:latest




