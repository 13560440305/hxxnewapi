# hxxnewapi Docker 构建说明

## 构建前准备

将以下文件放入**本目录**（与 Dockerfile 同级）：

- `hxxnewapi`：已编译的 Linux 可执行程序（在项目根目录执行 `go build -o hxxnewapi .` 生成后拷贝到此目录）
- `.env`：运行所需的环境配置文件（可从项目根目录复制 `.env.example` 并改名为 `.env` 后按需修改）

## 构建镜像

```bash
cd hxxnewapi-docker
docker build -t hxxnewapi:latest .
```

## 运行容器

### 加入自建网络 hxxnet（推荐）

若尚未创建网络，先创建：

```bash
docker network create hxxnet
```

再运行容器并加入该网络：

```bash
docker run -d --name hxxnewapid --network hxxnet -p 3000:3000 hxxnewapi:latest
```

同一网络内的其他容器可通过容器名 `hxxnewapid` 访问本服务（如 `http://hxxnewapid:3000`）。

### 仅宿主机访问（不指定网络）

```bash
docker run -d --name hxxnewapid -p 3000:3000 hxxnewapi:latest
```

### 挂载数据目录

```bash
docker run -d --name hxxnewapid --network hxxnet -p 3000:3000 \
  -v /宿主机数据路径:/opt/hxx/hxx-new-api/data \
  hxxnewapi:latest
```

访问：http://localhost:3000
