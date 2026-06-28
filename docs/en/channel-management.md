# Channel Management

This page describes channel management endpoints.

**Quick links**: [List all channels](#get-channels) · [Get channel by ID](#get-channel-by-id) · [Fetch upstream model list](#fetch-models) · [Get model list](#get-model-list) · [List enabled models](#models-enabled) · [List channel models](#channel-models) · [Search channels](#search-channel) · [Get tag models](#tag-models)

---

<span id="get-channels"></span>
## List All Channels

List all channels with pagination and filtering support.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| p | integer | No | Page number |
| page_size | integer | No | Items per page |
| id_sort | boolean | No | Sort by ID |
| tag_mode | boolean | No | Tag mode |
| status | string | No | Filter by channel status |
| type | integer | No | Channel type |

### Response

- **200**: On success, returns the channel list (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/?p=1&page_size=10" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/?p=1&page_size=10", {
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
    "https://www.hxxopen.com/api/channel/",
    params={"p": 1, "page_size": 10},
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="fetch-models"></span>
## Fetch Upstream Model List

Fetch the upstream model list for a channel by channel ID.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/fetch_models/{id}`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Path Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| id | integer | Yes | Channel ID |

### Response

- **200**: On success, returns the upstream model list for the channel (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/fetch_models/0" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/fetch_models/0", {
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
    "https://www.hxxopen.com/api/channel/fetch_models/0",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="get-channel-by-id"></span>
## Get Channel by ID

Get details for a specific channel by channel ID.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/{id}`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Path Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| id | integer | Yes | Channel ID |

### Response

- **200**: On success, returns channel details (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/0" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/0", {
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
    "https://www.hxxopen.com/api/channel/0",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="get-model-list"></span>
## Get Model List

Specify channel information in the request body to fetch the model list for that channel.

**Permission**: Requires Admin privileges.

**Method**: `POST`  
**Path**: `/api/channel/fetch_models`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| base_url | string | No | Channel base URL |
| type | integer | No | Channel type |
| key | string | No | API key |

### Response

- **200**: On success, returns the model list (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/api/channel/fetch_models" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"base_url": "https://api.openai.com", "type": 1}'
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/fetch_models", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
  },
  body: JSON.stringify({ base_url: "https://api.openai.com", type: 1 })
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/api/channel/fetch_models",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={"base_url": "https://api.openai.com", "type": 1},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="models-enabled"></span>
## List Enabled Models

List currently enabled channel models.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/models_enabled`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the enabled model list (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/models_enabled" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/models_enabled", {
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
    "https://www.hxxopen.com/api/channel/models_enabled",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="channel-models"></span>
## List Channel Models

List channel–model associations.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/models`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Response

- **200**: On success, returns the channel model list (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/models" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/models", {
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
    "https://www.hxxopen.com/api/channel/models",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="search-channel"></span>
## Search Channels

Search channels by keyword, group, or model.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/search`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| keyword | string | No | Search keyword |
| group | string | No | Group |
| model | string | No | Model |

### Response

- **200**: On success, returns matching channels (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/search?keyword=openai" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/search?keyword=openai", {
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
    "https://www.hxxopen.com/api/channel/search",
    params={"keyword": "openai"},
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="tag-models"></span>
## Get Tag Models

Get the model list for a given tag.

**Permission**: Requires Admin privileges.

**Method**: `GET`  
**Path**: `/api/channel/tag/models`

### Authorization

Use Bearer Token authentication (admin Access Token).

- **Format**: `Authorization: Bearer <token>`
- **Location**: `header`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| tag | string | Yes | Tag name |

### Response

- **200**: On success, returns models for the tag (exact format depends on the live API).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/api/channel/tag/models?tag=default" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/api/channel/tag/models?tag=default", {
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
    "https://www.hxxopen.com/api/channel/tag/models",
    params={"tag": "default"},
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->
