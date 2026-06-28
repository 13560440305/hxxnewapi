# Two-Factor Authentication

This page describes two-factor authentication (2FA) endpoints.

**Quick links**: [Regenerate backup codes](#backup-codes) · [Disable 2FA](#disable-2fa) · [Enable 2FA](#enable-2fa) · [Set up 2FA](#setup-2fa) · [Get 2FA statistics](#stats-2fa) · [Get 2FA status](#status-2fa)

---

<span id="backup-codes"></span>
## Regenerate Backup Codes

Regenerate 2FA backup codes.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/2fa/backup_codes`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the backup code regeneration result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/2fa/backup_codes" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/backup_codes", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  }
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/api/user/2fa/backup_codes",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

<span id="disable-2fa"></span>
## Disable 2FA

Disable 2FA for the current user.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/2fa/disable`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| code | string | No | 2FA verification code |

### Response

- **200**: On success, returns the disable result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/2fa/disable" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}'
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/disable", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <API_KEY>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ code: "123456" })
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/api/user/2fa/disable",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={"code": "123456"},
)
print(response.text)
```
<!-- tabs:end -->

<span id="enable-2fa"></span>
## Enable 2FA

Enable 2FA for the current user.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/2fa/enable`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| code | string | No | 2FA verification code |

### Response

- **200**: On success, returns the enable result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/2fa/enable" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}'
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/enable", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <API_KEY>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ code: "123456" })
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/api/user/2fa/enable",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={"code": "123456"},
)
print(response.text)
```
<!-- tabs:end -->

<span id="setup-2fa"></span>
## Set Up 2FA

Set up 2FA for the current user.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/2fa/setup`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the setup result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/2fa/setup" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/setup", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  }
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/api/user/2fa/setup",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="stats-2fa"></span>
## Get 2FA Statistics

Get 2FA statistics.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/user/2fa/stats`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns 2FA statistics (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/user/2fa/stats" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/stats", {
  method: "GET",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  }
})
```

#### **Python**
```py
import requests

response = requests.get(
    "https://www.hxxopen.com/api/user/2fa/stats",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="status-2fa"></span>
## Get 2FA Status

Get 2FA status for the current user.

**Permission**: Requires login (User).

**Method**: `GET`  
**Path**: `/api/user/2fa/status`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns 2FA status (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/user/2fa/status" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/2fa/status", {
  method: "GET",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  }
})
```

#### **Python**
```py
import requests

response = requests.get(
    "https://www.hxxopen.com/api/user/2fa/status",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->
