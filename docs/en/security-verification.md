# Security Verification

This page describes security verification endpoints.

**Quick links**: [General security verification](#verify-post) · [Get verification status](#verify-status)

---

<span id="verify-post"></span>
## General Security Verification

Perform general security verification.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/verify`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the verification result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/verify" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/verify", {
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
    "https://www.hxxopen.com/api/verify",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="verify-status"></span>
## Get Verification Status

Get the current verification status.

**Permission**: Requires login (User).

**Method**: `GET`  
**Path**: `/api/verify/status`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns verification status information (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/verify/status" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/verify/status", {
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
    "https://www.hxxopen.com/api/verify/status",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->
