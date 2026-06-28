# Video

This page describes video-related endpoints: **Create video generation task** and **Get video generation task status**.

**Quick links**: [Create video task](#video-create) · [Get video task status](#video-status)

---

<span id="video-create"></span>
## Create Video Task

Submit a video generation task. Supports text-to-video and image-to-video. Returns a task ID that can be used with the "Get video task status" endpoint to query task status.

**Method**: `POST`  
**Path**: `/v1/video/generations`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | No | Model/style ID |
| prompt | string | No | Text prompt |
| image | string | No | Image input (URL or Base64) for image-to-video |
| duration | number | No | Video duration (seconds) |
| width | integer | No | Video width |
| height | integer | No | Video height |
| fps | integer | No | Video frame rate |
| seed | integer | No | Random seed |
| n | integer | No | Number of videos to generate |
| response_format | string | No | Response format |
| user | string | No | User identifier |
| metadata | object | No | Extended parameters (e.g. negative_prompt, style, quality_level) |

### Response

- **200**: On success, returns task information, for example:

```json
{
  "task_id": "abcd1234efgh",
  "status": "queued"
}
```

- **400**: On request error, returns:

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
curl -X POST "https://www.hxxopen.com/v1/video/generations" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "prompt": "A cat walking in the rain"
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  model: "your-model-id",
  prompt: "A cat walking in the rain"
})

fetch("https://www.hxxopen.com/v1/video/generations", {
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
    "https://www.hxxopen.com/v1/video/generations",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "your-model-id",
        "prompt": "A cat walking in the rain",
    },
)
print(response.json())
```
<!-- tabs:end -->

---

<span id="video-status"></span>
## Get Video Task Status

Query the status and result of a video generation task by task ID.

**Task status values**:

- `queued`: Queued
- `in_progress`: Generating
- `completed`: Completed
- `failed`: Failed

**Method**: `GET`  
**Path**: `/v1/video/generations/{task_id}`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Path Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| task_id | string | Yes | Task ID returned when creating the video task |

### Response

- **200**: On success, returns task status and result, for example:

```json
{
  "task_id": "abcd1234efgh",
  "status": "completed",
  "url": "https://example.com/video.mp4",
  "format": "mp4",
  "metadata": {
    "duration": 5,
    "fps": 30,
    "width": 1280,
    "height": 720,
    "seed": 20231234
  },
  "error": {
    "code": 0,
    "message": "string"
  }
}
```

- **404**: When the task does not exist, returns:

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
curl -X GET "https://www.hxxopen.com/v1/video/generations/abcd1234efgh" \
  -H "Authorization: Bearer <API_KEY>"
```

#### **JavaScript**
```js
const taskId = "abcd1234efgh"

fetch(`https://www.hxxopen.com/v1/video/generations/${taskId}`, {
  method: "GET",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  }
})
```

#### **Python**
```py
import requests

task_id = "abcd1234efgh"
response = requests.get(
    f"https://www.hxxopen.com/v1/video/generations/{task_id}",
    headers={"Authorization": "Bearer <API_KEY>"},
)
print(response.json())
```
<!-- tabs:end -->
