# Moderation

This page describes the content moderation endpoint: check whether text content violates usage policies.

**Method**: `POST`  
**Path**: `/v1/moderations`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| input | string \| array\<string\> | Yes | Text to moderate; a single string or an array of strings |
| model | string | No | Moderation model |

### Response

- **200**: On success, returns `application/json` with a structure similar to:

```json
{
  "id": "string",
  "model": "string",
  "results": [
    {
      "flagged": true,
      "categories": {},
      "category_scores": {}
    }
  ]
}
```

- `results` corresponds one-to-one with `input`; `flagged` indicates whether content was flagged as violating policy; `categories` / `category_scores` provide per-dimension classifications and scores.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/moderations" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "待审查的文本内容"
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  input: "待审查的文本内容"
})

fetch("https://www.hxxopen.com/v1/moderations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
  },
  body
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/v1/moderations",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={"input": "待审查的文本内容"},
)
print(response.json())
```
<!-- tabs:end -->
