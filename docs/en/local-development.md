# Local Development and Startup

This guide explains how to run the hxxnewapi service locally on Windows, macOS, or Linux.

## Requirements

| Component | Version |
|-----------|---------|
| Go | ≥ 1.22 |
| Bun | Latest stable (frontend development/build) |
| MySQL | ≥ 5.7.8 (8.x recommended) |
| Redis | Any stable release (configure password in `.env` if enabled) |

If `SQL_DSN` is not configured, the application falls back to SQLite (`one-api.db`). If `REDIS_CONN_STRING` is not configured, Redis-related features are unavailable.

## 1. Configure Environment Variables

Copy the example configuration in the project root and edit it:

```bash
cp .env.example .env
```

Common settings (MySQL + Redis example):

```env
# Database (MySQL)
SQL_DSN=root:your_password@tcp(127.0.0.1:3306)/hxxnewapi?parseTime=true

# Redis (URL-encode special characters in passwords, e.g. # → %23)
REDIS_CONN_STRING=redis://:your_password@127.0.0.1:6379/0

# Optional: listen port, default 3000
# PORT=3000
```

The `.env` file in the project root is loaded automatically on startup.

### Create the MySQL Database

Before first use, run in MySQL:

```sql
CREATE DATABASE hxxnewapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 2. Startup Options

**You must build the frontend before the first run.** The backend embeds static assets via `go:embed web/dist`. If `web/dist` does not exist, `go run main.go` will fail with:

```text
pattern web/dist: no matching files found
```

Run from the project root:

```bash
cd web
bun install
bun run build
cd ..
```

### Option A: Backend Only (recommended for daily development)

Use this when the frontend has already been built, or when you only need to debug the API / admin dashboard (using embedded `web/dist`).

```bash
# Project root
go run main.go
```

If `web/dist` is missing or outdated, run first:

```bash
cd web && bun install && bun run build
cd ..
go run main.go
```

Visit: **http://localhost:3000**

### Option B: Separate Frontend and Backend Development

Start backend and frontend separately. The frontend supports hot reload; API requests are proxied to the backend.

**Terminal 1 — Backend:**

```bash
go run main.go
```

**Terminal 2 — Frontend:**

```bash
cd web
bun install
bun run dev
```

Visit: **http://localhost:5173** (Vite proxies `/api` and similar requests to `http://localhost:3000`)

### Option C: Build a Single Executable

Bundle the frontend into the binary. Suitable for local acceptance testing or pre-deployment verification:

```bash
make build
```

On Windows this produces `new-api.exe`; on Linux/macOS it produces `new-api`:

```bash
# Windows
.\new-api.exe

# Linux / macOS
./new-api
```

## 3. First Login

When the database is empty and no users exist, the application automatically creates a root administrator:

| Field | Default |
|-------|---------|
| Username | `root` |
| Password | `123456` |

Change the password immediately after logging in.

## 4. Common Commands

| Scenario | Command |
|----------|---------|
| Install frontend dependencies | `cd web && bun install` |
| Build frontend | `cd web && bun run build` |
| Run backend (dev) | `go run main.go` |
| Run frontend (dev) | `cd web && bun run dev` |
| One-step build (frontend + backend) | `make build` |
| Build backend only (no frontend build) | `go build -o new-api .` |

## 5. Built-in Documentation (/docs)

Documentation is served with the main application and opens based on interface language:

| Language | URL |
|----------|-----|
| Chinese (Simplified / Traditional) | http://localhost:3000/docs/cn/ |
| English | http://localhost:3000/docs/en/ |

Visiting http://localhost:3000/docs/ redirects according to your UI language (falls back to Chinese when no matching docs exist).

- The top navigation "Docs" link defaults to `/docs/` (change under **System Settings → Operation Settings → Documentation URL** for an external URL)
- In development mode with `DEBUG=true`, docs are read from the `docs/` directory on disk; **restart the backend** after editing Markdown for changes to take effect
- The frontend dev server (5173) proxies `/docs` to backend port 3000

## 6. Docker Deployment

For containerized deployment, see section "Docker Build and Run" in the project root [README.md](../../README.md), or run:

```bash
docker-compose up -d --build
```

## 7. Troubleshooting

| Symptom | Suggestion |
|---------|------------|
| `Redis ping test failed` | Check that Redis is running and `REDIS_CONN_STRING` password is correct (encode `#` as `%23`) |
| MySQL connection failed | Confirm database `hxxnewapi` exists and credentials/port are correct |
| Blank page or 404 | Run `cd web && bun run build` then restart the backend |
| `pattern web/dist: no matching files found` | Same as above — build the frontend to generate `web/dist` |
| Port in use | Set `PORT=<other port>` in `.env` |

For more environment variable details, see `.env.example` in the project root.
