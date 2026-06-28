# Text Completions

This page describes the text completions endpoint: create text completions from a given prompt. Compatible with the OpenAI Completions API format.

**Method**: `POST`  
**Path**: `/v1/completions`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | Yes | Model ID |
| prompt | string \| array\<string\> | Yes | Prompt text or list of prompts |
| max_tokens | integer | No | Maximum number of tokens to generate |
| temperature | number | No | Sampling temperature |
| top_p | number | No | Nucleus sampling parameter |
| n | integer | No | Number of completions to generate |
| stream | boolean | No | Whether to stream the response |
| stop | string \| array\<string\> | No | Stop sequences |
| suffix | string | No | Completion suffix |
| echo | boolean | No | Whether to echo the prompt in the result |

### Response

- **200**: On success, returns `application/json`. Example structure:

```json
{
  "id": "string",
  "object": "text_completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "text": "string",
      "index": 0,
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 0,
      "audio_tokens": 0,
      "image_tokens": 0
    },
    "completion_tokens_details": {
      "text_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0
    }
  }
}
```

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/completions" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "prompt": "请用一句话介绍什么是人工智能。",
    "max_tokens": 256
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  model: "gpt-4o-mini",
  prompt: "请用一句话介绍什么是人工智能。",
  max_tokens: 256
})

fetch("https://www.hxxopen.com/v1/completions", {
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
    "https://www.hxxopen.com/v1/completions",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-4o-mini",
        "prompt": "请用一句话介绍什么是人工智能。",
        "max_tokens": 256,
    },
)
print(response.json())
```
<!-- tabs:end -->
