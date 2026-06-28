# Realtime Voice

This page describes the realtime voice endpoint: establish a connection over WebSocket for real-time conversation.

**Note**: This is a WebSocket endpoint; connect using the WebSocket protocol.

**Connection type**: WebSocket  
**Path**: `/v1/realtime`  
**Example connection URL**: `wss://www.hxxopen.com/v1/realtime?model=gpt-4o-realtime`

### Authorization

Use Bearer Token authentication. The token may be passed as a URL query parameter when connecting, or included in the first message (depending on gateway implementation).

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Common approach**: Include the token in the WebSocket request header or connection URL, e.g. `wss://www.hxxopen.com/v1/realtime?model=gpt-4o-realtime`. Pass the token according to gateway requirements (e.g. query parameter `authorization` or header).

### Query Parameters

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | No | Realtime voice model to use |

### Response

- **101 Switching Protocols**: Successfully upgraded to a WebSocket connection; subsequent messages are exchanged over WebSocket for real-time conversation.
- **400**: On request error, returns `application/json`:

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
#### **JavaScript (WebSocket)**
```js
const token = "YOUR_API_KEY"
const model = "gpt-4o-realtime"
const url = `wss://www.hxxopen.com/v1/realtime?model=${encodeURIComponent(model)}`

const ws = new WebSocket(url, ["Bearer", token])

ws.onopen = () => console.log("已连接")
ws.onmessage = (e) => console.log("收到:", e.data)
ws.onerror = (e) => console.error("错误:", e)
ws.onclose = (e) => console.log("关闭:", e.code, e.reason)
```

#### **Python**
```py
import asyncio
import websockets

async def main():
    token = "YOUR_API_KEY"
    model = "gpt-4o-realtime"
    uri = f"wss://www.hxxopen.com/v1/realtime?model={model}"
    extra_headers = {"Authorization": f"Bearer {token}"}
    async with websockets.connect(uri, extra_headers=extra_headers) as ws:
        async for msg in ws:
            print("收到:", msg)

asyncio.run(main())
```

#### **cURL (endpoint reference only)**
```bash
# Realtime voice is a WebSocket endpoint. Use a WebSocket-capable client, for example:
# wscat -c "wss://www.hxxopen.com/v1/realtime?model=gpt-4o-realtime" -H "Authorization: Bearer <API_KEY>"
```
<!-- tabs:end -->
