# Top-Up

This page describes top-up (recharge) endpoints.

**Quick links**: [Creem Webhook](#creem-webhook) · [Stripe Webhook](#stripe-webhook) · [Initiate Creem payment](#user-creem-pay) · [Get payment amount](#user-amount) · [Initiate Epay payment](#user-pay) · [Epay callback](#user-epay-notify) · [Initiate Stripe payment](#user-stripe-pay) · [Get Stripe payment amount](#user-stripe-amount) · [Get top-up info](#user-topup-info) · [Get user top-up records](#user-topup-self)

---

<span id="creem-webhook"></span>
## Creem Webhook

Receive payment callbacks (webhooks) from Creem.

**Authentication**: None required (webhook callback).

**Method**: `POST`  
**Path**: `/api/creem/webhook`

### Response

- **200**: On success, returns the processing result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/creem/webhook"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/creem/webhook", {
  method: "POST"
})
```

#### **Python**
```py
import requests

response = requests.post("https://www.hxxopen.com/api/creem/webhook")
print(response.text)
```
<!-- tabs:end -->

<span id="stripe-webhook"></span>
## Stripe Webhook

Receive payment callbacks (webhooks) from Stripe.

**Authentication**: None required (webhook callback).

**Method**: `POST`  
**Path**: `/api/stripe/webhook`

### Response

- **200**: On success, returns the processing result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/stripe/webhook"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/stripe/webhook", {
  method: "POST"
})
```

#### **Python**
```py
import requests

response = requests.post("https://www.hxxopen.com/api/stripe/webhook")
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-creem-pay"></span>
## Initiate Creem Payment

Start a Creem payment flow.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/creem/pay`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the payment initiation result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/creem/pay" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/creem/pay", {
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
    "https://www.hxxopen.com/api/user/creem/pay",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-amount"></span>
## Get Payment Amount

Get payment amount information for the user.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/amount`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns payment amount information (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/amount" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/amount", {
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
    "https://www.hxxopen.com/api/user/amount",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-pay"></span>
## Initiate Epay Payment

Start an Epay payment flow.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/pay`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the payment initiation result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/pay" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/pay", {
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
    "https://www.hxxopen.com/api/user/pay",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-epay-notify"></span>
## Epay Callback

Receive payment callbacks from Epay.

**Authentication**: None required (payment callback).

**Method**: `GET`  
**Path**: `/api/user/epay/notify`

### Response

- **200**: On success, returns the callback processing result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/user/epay/notify"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/epay/notify", {
  method: "GET"
})
```

#### **Python**
```py
import requests

response = requests.get("https://www.hxxopen.com/api/user/epay/notify")
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-stripe-pay"></span>
## Initiate Stripe Payment

Start a Stripe payment flow.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/stripe/pay`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the payment initiation result (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/stripe/pay" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/stripe/pay", {
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
    "https://www.hxxopen.com/api/user/stripe/pay",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-stripe-amount"></span>
## Get Stripe Payment Amount

Get Stripe payment amount information.

**Permission**: Requires login (User).

**Method**: `POST`  
**Path**: `/api/user/stripe/amount`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns Stripe payment amount information (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/user/stripe/amount" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/stripe/amount", {
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
    "https://www.hxxopen.com/api/user/stripe/amount",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-topup-info"></span>
## Get Top-Up Info

Get top-up information for the user.

**Permission**: Requires login (User).

**Method**: `GET`  
**Path**: `/api/user/topup/info`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns top-up information (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/user/topup/info" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/topup/info", {
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
    "https://www.hxxopen.com/api/user/topup/info",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->

---

<span id="user-topup-self"></span>
## Get User Top-Up Records

Get top-up records for the current user.

**Permission**: Requires login (User).

**Method**: `GET`  
**Path**: `/api/user/topup/self`

### Authorization

Use Bearer Token authentication (user Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns user top-up records (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/user/topup/self" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/user/topup/self", {
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
    "https://www.hxxopen.com/api/user/topup/self",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.text)
```
<!-- tabs:end -->
