# hxxnewapi 运行镜像（需先将编译好的 hxxnewapi 与 .env 放入本目录）
# 构建: docker build -t hxxnewapi:latest .
# 自建网络: docker network create hxxnet
# 运行: docker run -d --name hxxnewapid --network hxxnet -p 3000:3000 hxxnewapi:latest

FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/hxx/hxx-new-api

# 拷贝可执行程序与配置文件（构建时请将 hxxnewapi 与 .env 放在 Dockerfile 同目录）
COPY hxxnewapi .
COPY .env .

RUN chmod +x hxxnewapi

EXPOSE 3000

ENTRYPOINT ["./hxxnewapi"]
