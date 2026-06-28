# OAuth

This page describes OAuth-related endpoints.

**Quick links**: [Discord OAuth login](#oauth-discord) · [Bind email](#oauth-email-bind) · [GitHub OAuth login](#oauth-github) · [Generate OAuth state](#oauth-state) · [Bind Telegram](#oauth-telegram-bind) · [Telegram login](#oauth-telegram-login) · [Bind WeChat](#oauth-wechat-bind) · [WeChat OAuth login](#oauth-wechat)

---

<span id="oauth-discord"></span>
## Discord OAuth Login

OAuth login callback for Discord.

**Authentication**: None required (OAuth callback).

**Method**: `GET`  
**Path**: `/api/oauth/discord`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| code | string | No | OAuth authorization code |

### Response

- **200**: On success, returns the login callback result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/discord?code=xxxxx"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/discord?code=xxxxx", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get(
    "https://www.hxxopen.com/api/oauth/discord",
    params={"code": "xxxxx"},
)
print(response.text)
```
<!-- tabs:end -->

<span id="oauth-wechat"></span>
## WeChat OAuth Login

OAuth login callback for WeChat.

**Authentication**: None required (OAuth callback).

**Method**: `GET`  
**Path**: `/api/oauth/wechat`

### Response

- **200**: On success, returns the login callback result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/wechat"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/wechat", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/oauth/wechat")
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-wechat-bind"></span>
## Bind WeChat

Bind a WeChat account.

**Authentication**: None required.

**Method**: `GET`  
**Path**: `/api/oauth/wechat/bind`

### Response

- **200**: On success, returns the binding result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/wechat/bind"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/wechat/bind", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/oauth/wechat/bind")
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-telegram-login"></span>
## Telegram Login

Login callback for Telegram.

**Authentication**: None required (OAuth callback).

**Method**: `GET`  
**Path**: `/api/oauth/telegram/login`

### Response

- **200**: On success, returns the login callback result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/telegram/login"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/telegram/login", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/oauth/telegram/login")
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-telegram-bind"></span>
## Bind Telegram

Bind a Telegram account.

**Authentication**: None required.

**Method**: `GET`  
**Path**: `/api/oauth/telegram/bind`

### Response

- **200**: On success, returns the binding result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/telegram/bind"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/telegram/bind", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/oauth/telegram/bind")
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-email-bind"></span>
## Bind Email

Bind an email address.

**Authentication**: None required.

**Method**: `GET`  
**Path**: `/api/oauth/email/bind`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| email | string | No | Email address |
| code | string | No | Verification code |

### Response

- **200**: On success, returns the binding result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/email/bind?email=test@example.com&code=123456"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/email/bind?email=test@example.com&code=123456", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get(
    "https://www.hxxopen.com/api/oauth/email/bind",
    params={"email": "test@example.com", "code": "123456"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-state"></span>
## Generate OAuth State

Generate the `state` parameter used in the OAuth login flow.

**Authentication**: None required.

**Method**: `GET`  
**Path**: `/api/oauth/state`

### Response

- **200**: On success, returns the generated state (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/state"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/state", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/oauth/state")
print(response.text)
```
<!-- tabs:end -->

---

<span id="oauth-github"></span>
## GitHub OAuth Login

OAuth login callback for GitHub.

**Authentication**: None required (OAuth callback).

**Method**: `GET`  
**Path**: `/api/oauth/github`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| code | string | No | OAuth authorization code |

### Response

- **200**: On success, returns the login callback result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/oauth/github?code=xxxxx"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/oauth/github?code=xxxxx", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get(
    "https://www.hxxopen.com/api/oauth/github",
    params={"code": "xxxxx"},
)
print(response.text)
```
<!-- tabs:end -->
