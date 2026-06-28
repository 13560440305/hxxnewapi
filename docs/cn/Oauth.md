# Oauth

本页说明 OAuth 相关接口。

**快速跳转**：[Discord OAuth 登录](#oauth-discord) · [绑定邮箱](#oauth-email-bind) · [GitHub OAuth 登录](#oauth-github) · [生成 OAuth State](#oauth-state) · [绑定 Telegram](#oauth-telegram-bind) · [Telegram 登录](#oauth-telegram-login) · [绑定微信](#oauth-wechat-bind) · [微信 OAuth 登录](#oauth-wechat)

---

<span id="oauth-discord"></span>
## Discord OAuth 登录

用于 Discord OAuth 登录回调。

**鉴权**：无需鉴权（OAuth 回调）。

**请求方式**：`GET`  
**路径**：`/api/oauth/discord`

### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 否 | OAuth 授权码 |

### Response

- **200**：成功时返回登录回调结果（具体格式以实际接口为准）。

### 示例

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
## 微信 OAuth 登录

用于微信 OAuth 登录回调。

**鉴权**：无需鉴权（OAuth 回调）。

**请求方式**：`GET`  
**路径**：`/api/oauth/wechat`

### Response

- **200**：成功时返回登录回调结果（具体格式以实际接口为准）。

### 示例

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
## 绑定微信

用于绑定微信账号。

**鉴权**：无需鉴权。

**请求方式**：`GET`  
**路径**：`/api/oauth/wechat/bind`

### Response

- **200**：成功时返回绑定结果（具体格式以实际接口为准）。

### 示例

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
## Telegram 登录

用于 Telegram 登录回调。

**鉴权**：无需鉴权（OAuth 回调）。

**请求方式**：`GET`  
**路径**：`/api/oauth/telegram/login`

### Response

- **200**：成功时返回登录回调结果（具体格式以实际接口为准）。

### 示例

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
## 绑定 Telegram

用于绑定 Telegram 账号。

**鉴权**：无需鉴权。

**请求方式**：`GET`  
**路径**：`/api/oauth/telegram/bind`

### Response

- **200**：成功时返回绑定结果（具体格式以实际接口为准）。

### 示例

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
## 绑定邮箱

用于绑定邮箱。

**鉴权**：无需鉴权。

**请求方式**：`GET`  
**路径**：`/api/oauth/email/bind`

### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | 否 | 邮箱地址 |
| code | string | 否 | 验证码 |

### Response

- **200**：成功时返回绑定结果（具体格式以实际接口为准）。

### 示例

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
## 生成 OAuth State

生成 OAuth 登录流程使用的 state 参数。

**鉴权**：无需鉴权。

**请求方式**：`GET`  
**路径**：`/api/oauth/state`

### Response

- **200**：成功时返回 state 生成结果（具体格式以实际接口为准）。

### 示例

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
## GitHub OAuth 登录

用于 GitHub OAuth 登录回调。

**鉴权**：无需鉴权（OAuth 回调）。

**请求方式**：`GET`  
**路径**：`/api/oauth/github`

### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 否 | OAuth 授权码 |

### Response

- **200**：成功时返回登录回调结果（具体格式以实际接口为准）。

### 示例

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
