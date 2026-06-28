# Images

This page describes image-related endpoints: **Edit Image** and **Generate Image**.

**Quick links**: [Edit Image](#image-edits) · [Generate Image](#image-generations)

---

<span id="image-edits"></span>
## Edit Image

Create an edited or extended image given an original image and a prompt.

**Method**: `POST`  
**Path**: `/v1/images/edits`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: multipart/form-data`

| Parameter | Type | Required | Description |
|------|------|------|------|
| image | file | Yes | Image to edit. Must be a valid PNG file, less than 4MB, and square. If no mask is provided, the image must have transparency, which will be used as the mask |
| mask | file | No | Mask image: fully transparent areas (alpha of 0) indicate where to edit. Must be a valid PNG, less than 4MB, and the same size as `image` |
| prompt | string | Yes | Text description of the desired image; maximum length 1000 characters |
| n | string | No | Number of images to generate; 1–10 |
| size | string | No | Generated size: `256x256`, `512x512`, or `1024x1024` |
| response_format | string | No | Response format: `url` or `b64_json` |
| user | string | No | Unique identifier for the end user, for monitoring and abuse detection |
| model | string | No | Model |

### Response

- **200**: On success, returns `application/json`.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/images/edits" \
  -H "Authorization: Bearer <API_KEY>" \
  -F image="@/path/to/image.png" \
  -F prompt="A cute baby sea otter wearing a beret."
```

#### **JavaScript**
```js
const formData = new FormData()
formData.append("image", imageFile)  // File 对象，PNG
formData.append("prompt", "A cute baby sea otter wearing a beret.")

fetch("https://www.hxxopen.com/v1/images/edits", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <API_KEY>"
  },
  body: formData
})
```

#### **Python**
```py
import requests

with open("image.png", "rb") as f:
    response = requests.post(
        "https://www.hxxopen.com/v1/images/edits",
        headers={"Authorization": "Bearer <API_KEY>"},
        files={"image": f},
        data={"prompt": "A cute baby sea otter wearing a beret."},
    )
print(response.json())
```
<!-- tabs:end -->

---

<span id="image-generations"></span>
## Generate Image

Create an image from a given prompt.

**Method**: `POST`  
**Path**: `/v1/images/generations`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | No | Image generation model: `dall-e-2`, `dall-e-3`, or `gpt-image-1`; default `dall-e-2` |
| prompt | string | Yes | Image description. Max length: 32000 characters for `gpt-image-1`, 1000 for `dall-e-2`, 4000 for `dall-e-3` |
| n | integer | No | Number of images to generate; 1–10; `dall-e-3` supports only 1 |
| size | string | No | Size. gpt-image-1: `1024x1024`, `1536x1024`, `1024x1536`, or `自动`; dall-e-2: `256x256`, `512x512`, `1024x1024`; dall-e-3: `1024x1024`, `1792x1024`, `1024x1792` |
| background | string | No | gpt-image-1 only: `透明`, `不透明`, or `自动`. When transparent, the output format must support transparency (e.g. png, webp) |
| moderation | string | No | gpt-image-1 only: content moderation level; `低` or `自动` |
| quality | string | No | Generated image quality |
| stream | string | No | Whether to stream the response |
| style | string | No | Style |
| user | string | No | Unique identifier for the end user |

### Response

- **200**: On success, returns `application/json`. Example structure:

```json
{
  "created": 0,
  "data": [
    {
      "b64_json": "string",
      "url": "string"
    }
  ],
  "usage": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "input_tokens_details": {
      "text_tokens": 0,
      "image_tokens": 0
    }
  }
}
```

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/images/generations" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-2",
    "prompt": "A cute cat on the sofa",
    "n": 1,
    "size": "1024x1024"
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  model: "dall-e-2",
  prompt: "A cute cat on the sofa",
  n: 1,
  size: "1024x1024"
})

fetch("https://www.hxxopen.com/v1/images/generations", {
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
    "https://www.hxxopen.com/v1/images/generations",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "dall-e-2",
        "prompt": "A cute cat on the sofa",
        "n": 1,
        "size": "1024x1024",
    },
)
print(response.json())
```
<!-- tabs:end -->
