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

## 二、本地开发与编译

### 前端（web/）

| 操作     | 命令 |
|----------|------|
| 安装依赖 | `cd web && bun install` |
| 开发运行 | `cd web && bun run dev` |
| 编译打包 | `cd web && bun run build` |

开发时访问：http://localhost:5173

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
  -e MYSQL_ROOT_PASSWORD=ABC123### \
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
  redis-server --requirepass "ABC123###"

# hxxnewapid
docker run -d \
  --name hxxnewapid \
  --network hxxnet \
  -p 3000:3000 \
  hxxnewapi:latest


// 打包容器发布（导出镜像）

---

## 文档与 GitHub Pages

`docs/` 目录可通过 GitHub Pages 发布为在线文档站（带侧栏与搜索）。

**启用步骤：**

1. 打开仓库 **Settings → Pages**。
2. **Source** 选择 **Deploy from a branch**。
3. **Branch** 选 `main`，**Folder** 选 **/docs**，保存。
4. 等待 1～2 分钟，访问：**https://13560440305.github.io/hxxnewapi/**

**本地预览文档站**（已安装 [docsify-cli](https://www.npmjs.com/package/docsify-cli) 时）：

在项目根目录执行：

```bash
docsify serve docs
```

或在 `docs` 目录下执行：

```bash
cd docs
docsify serve .
```

浏览器打开 **http://localhost:3000** 即可。未安装时可用 `npx docsify-cli serve docs`。

本地测试建议：
使用 

npx http-server docs -p 3000

浏览器打开 http://localhost:3000/cn/

vercel发布地址
https://hxxnewapi.vercel.app/


