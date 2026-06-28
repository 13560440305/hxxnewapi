# Models

This page describes the models list endpoint: retrieve the list of currently available models.

The response format is automatically determined based on request headers and parameters:

- If the request headers include `x-api-key` and `anthropic-version`, returns Anthropic format
- If the request headers include `x-goog-api-key` or the query parameter `key` is present, returns Gemini format
- Otherwise, returns OpenAI format

**Method**: `GET`  
**Path**: `/v1/models`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| key | string | No | Google API Key; used when requesting Gemini format |

### Header Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| x-api-key | string | No | Anthropic API Key; used when requesting Claude format |
| anthropic-version | string | No | Anthropic API version |
| x-goog-api-key | string | No | Google API Key; used when requesting Gemini format |

### Response

- **200**: On success, returns `application/json`. OpenAI format example:

```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-4",
      "object": "model",
      "created": 0,
      "owned_by": "openai"
    }
  ]
}
```

- **401**: When unauthorized, returns:

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X GET "https://www.hxxopen.com/v1/models" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/v1/models", {
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
    "https://www.hxxopen.com/v1/models",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->
