# Model Management

This page describes model management endpoints.

**Quick links**: [List all model metadata](#get-models) · [Get model by ID](#get-model-by-id) · [List missing models](#get-missing-models) · [Search models](#search-models)

---

<span id="get-models"></span>
## List All Model Metadata

List all model metadata.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/models/`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the model metadata list (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/models/" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/models/", {
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
    "https://www.hxxopen.com/api/models/",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="get-model-by-id"></span>
## Get Model by ID

Get metadata for a specific model by model ID.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/models/{id}`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Path Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| id | integer | Yes | Model ID |

### Response

- **200**: On success, returns model metadata (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/models/0" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/models/0", {
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
    "https://www.hxxopen.com/api/models/0",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="get-missing-models"></span>
## List Missing Models

List missing models (e.g. models not yet configured in current channels).

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/models/missing`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns missing model information (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/models/missing" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/models/missing", {
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
    "https://www.hxxopen.com/api/models/missing",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="search-models"></span>
## Search Models

Search models by keyword.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/models/search`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| keyword | string | No | Search keyword |

### Response

- **200**: On success, returns matching models (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/models/search?keyword=gpt" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/models/search?keyword=gpt", {
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
    "https://www.hxxopen.com/api/models/search",
    params={"keyword": "gpt"},
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->
