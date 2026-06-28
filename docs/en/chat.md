# Chat

This page describes chat/conversation endpoints: **Chat Completions format** and **Responses format**.

**Quick links**: [Chat Completions format](#chat-completions) · [Responses format](#responses)

---

<span id="chat-completions"></span>
## Chat Completions Format

Create a model response based on conversation history. Supports streaming and non-streaming responses. Compatible with the OpenAI Chat Completions API.

**Method**: `POST`  
**Path**: `/v1/chat/completions`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | Yes | Model ID |
| messages | array\<object\> | Yes | List of conversation messages |
| temperature | number | No | Sampling temperature; default 1; range 0–2 |
| top_p | number | No | Nucleus sampling parameter; default 1; range 0–1 |
| n | integer | No | Number of completions to generate; default 1 |
| stream | boolean | No | Whether to stream the response; default false |
| stream_options | object | No | Streaming options |
| stop | string \| array\<string\> | No | Stop sequences |
| max_tokens | integer | No | Maximum number of tokens to generate |
| max_completion_tokens | integer | No | Maximum number of completion tokens |
| presence_penalty | number | No | Default 0; range -2–2 |
| frequency_penalty | number | No | Default 0; range -2–2 |
| logit_bias | object | No | — |
| user | string | No | — |
| tools | array\<object\> | No | — |
| tool_choice | string \| object | No | — |
| response_format | object | No | — |
| seed | integer | No | — |
| reasoning_effort | string | No | Reasoning intensity; options `low` \| `medium` \| `high` |
| modalities | array\<string\> | No | — |
| audio | object | No | — |

### Response

- **200**: On success, returns `application/json` containing `id`, `object`, `created`, `model`, `choices` (with `message`, `finish_reason`), `usage`, etc.
- **400** / **429**: On error, returns `{ "error": { "message", "type", "param", "code" } }`.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/chat/completions" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "system", "content": "你是一个助手。" },
      { "role": "user", "content": "你好" }
    ]
  }'
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "你是一个助手。" },
      { role: "user", content: "你好" }
    ]
  })
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "你是一个助手。"},
            {"role": "user", "content": "你好"},
        ],
    },
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="responses"></span>
## Responses Format

OpenAI Responses API for creating model responses. Supports multi-turn conversations, tool calling, reasoning, and more.

**Method**: `POST`  
**Path**: `/v1/responses`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | Yes | Model ID |
| input | string \| array\<object\> | No | Input content; may be a string or an array of messages |
| instructions | string | No | Instructions |
| max_output_tokens | integer | No | Maximum number of output tokens |
| temperature | number | No | — |
| top_p | number | No | — |
| stream | boolean | No | — |
| tools | array\<object\> | No | — |
| tool_choice | string \| object | No | — |
| reasoning | object | No | — |
| previous_response_id | string | No | — |
| truncation | string | No | Options: `auto` \| `disabled` |

### Response

- **200**: On success, returns `application/json` containing `id`, `object`, `created_at`, `status`, `model`, `output`, `usage`, etc.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/responses" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "input": "你好"
  }'
```

#### **JavaScript**
```js
fetch("https://www.hxxopen.com/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    input: "你好"
  })
})
```

#### **Python**
```py
import requests

response = requests.post(
    "https://www.hxxopen.com/v1/responses",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-4o-mini",
        "input": "你好",
    },
)
print(response.json())
```
<!-- tabs:end -->
