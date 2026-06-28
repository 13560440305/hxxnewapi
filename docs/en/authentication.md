# Authentication

This page describes authentication methods and permission levels for admin/management endpoints.

---

## Overview

Admin endpoints use a multi-level authentication mechanism. Common levels are: **Public**, **User**, **Admin**, and **Root**.

---

## Authentication Methods (choose one)

### Session

Obtain a Session via the login endpoint; the client maintains the session (e.g. via Cookie).

**Login endpoint**: `POST /api/user/login`

### Access Token (recommended)

Include the access token in the request header:

```
Authorization: Bearer {token}
```

Tokens can be generated under **Personal Settings → Security Settings → System Access Token**.

---

## Required Request Header

Some endpoints require a user identifier header:

```
New-Api-User: {user_id}
```

`{user_id}` must match the currently logged-in user; otherwise validation fails.

---

## Permission Levels

| Level | Description |
|------|------|
| **Public** | Accessible without authentication |
| **User** | Requires a logged-in session or a valid Access Token |
| **Admin** | Requires administrator privileges |
| **Root** | Highest privilege; only available to Root accounts |

When calling management endpoints, use a Session or Token with the appropriate identity for the required permission level.
