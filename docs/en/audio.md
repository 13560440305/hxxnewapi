# Audio

This page describes audio-related endpoints: **Text-to-Speech (TTS)**, **Audio Transcription (STT)**, and **Audio Translation**.

**Quick links**: [Text-to-Speech (TTS)](#tts) · [Audio Transcription (STT)](#stt) · [Audio Translation](#audio-translate)

---

<span id="tts"></span>
## Text-to-Speech

Convert text to audio.

**Method**: `POST`  
**Path**: `/v1/audio/speech`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | Yes | Model ID (e.g. `tts-1`) |
| input | string | Yes | Text to convert; length ≤ 4096 |
| voice | string | Yes | Voice: `alloy` \| `echo` \| `fable` \| `onyx` \| `nova` \| `shimmer` |
| response_format | string | No | Default `mp3`. Options: `mp3` \| `opus` \| `aac` \| `flac` \| `wav` \| `pcm` |
| speed | number | No | Speech speed; default `1`; range 0.25 ~ 4 |

### Response

- **200**: On success, returns an audio stream with `Content-Type` of `audio/mpeg` (or the type corresponding to `response_format`).

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/audio/speech" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "你好，这是一段测试文本。",
    "voice": "alloy"
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  "model": "tts-1",
  "input": "你好，这是一段测试文本。",
  "voice": "alloy"
})

fetch("https://www.hxxopen.com/v1/audio/speech", {
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
    "https://www.hxxopen.com/v1/audio/speech",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "tts-1",
        "input": "你好，这是一段测试文本。",
        "voice": "alloy",
    },
)
# response.content 为音频二进制数据
with open("output.mp3", "wb") as f:
    f.write(response.content)
```
<!-- tabs:end -->

---

<span id="stt"></span>
## Audio Transcription

Convert audio to text (speech recognition, STT).

**Method**: `POST`  
**Path**: `/v1/audio/transcriptions`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: multipart/form-data`

| Parameter | Type | Required | Description |
|------|------|------|------|
| file | file | Yes | Audio file (binary) |
| model | string | Yes | Model ID (e.g. `whisper-1`) |
| language | string | No | ISO-639-1 language code |
| prompt | string | No | Prompt text |
| response_format | string | No | Default `json`. Options: `json` \| `text` \| `srt` \| `verbose_json` \| `vtt` |
| temperature | number | No | Temperature parameter |
| timestamp_granularities | array\<string\> | No | Timestamp granularity |

### Response

- **200**: On success, returns `application/json`, e.g. `{ "text": "string" }`.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer <API_KEY>" \
  -F file="@/path/to/audio.mp3" \
  -F model="whisper-1"
```

#### **JavaScript**
```js
const formData = new FormData()
formData.append("file", audioFile)  // File 对象
formData.append("model", "whisper-1")

fetch("https://www.hxxopen.com/v1/audio/transcriptions", {
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

with open("audio.mp3", "rb") as f:
    response = requests.post(
        "https://www.hxxopen.com/v1/audio/transcriptions",
        headers={"Authorization": "Bearer <API_KEY>"},
        files={"file": f},
        data={"model": "whisper-1"},
    )
print(response.json())
```
<!-- tabs:end -->

---

<span id="audio-translate"></span>
## Audio Translation

Translate audio into English text.

**Method**: `POST`  
**Path**: `/v1/audio/translations`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: multipart/form-data`

| Parameter | Type | Required | Description |
|------|------|------|------|
| file | file | Yes | Audio file (binary) |
| model | string | Yes | Model ID |
| prompt | string | No | Prompt text |
| response_format | string | No | Response format |
| temperature | number | No | Temperature parameter |

### Response

- **200**: On success, returns `application/json`, e.g. `{ "text": "string" }`.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/audio/translations" \
  -H "Authorization: Bearer <API_KEY>" \
  -F file="@/path/to/audio.mp3" \
  -F model="whisper-1"
```

#### **JavaScript**
```js
const formData = new FormData()
formData.append("file", audioFile)
formData.append("model", "whisper-1")

fetch("https://www.hxxopen.com/v1/audio/translations", {
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

with open("audio.mp3", "rb") as f:
    response = requests.post(
        "https://www.hxxopen.com/v1/audio/translations",
        headers={"Authorization": "Bearer <API_KEY>"},
        files={"file": f},
        data={"model": "whisper-1"},
    )
print(response.json())
```
<!-- tabs:end -->
