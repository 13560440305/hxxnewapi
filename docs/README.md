# 项目文档

本目录包含用户文档与开发资料，随主程序在 **/docs** 路径提供。

## 结构

| 路径 | 说明 |
|------|------|
| `cn/` | 中文文档（简体/繁体界面均使用） |
| `en/` | 英文文档 |
| `index.html` | 根据界面语言跳转到 `cn/` 或 `en/` |

访问 `/docs/` 时读取浏览器 `i18nextLng`：英文界面打开 `en/`，其余默认 `cn/`。

## 开发

- 本地说明：[cn/本地开发与启动.md](./cn/本地开发与启动.md) / [en/local-development.md](./en/local-development.md)
- 修改 Markdown 后，`DEBUG=true` 时重启后端即可生效；生产需重新编译以嵌入 `go:embed`
