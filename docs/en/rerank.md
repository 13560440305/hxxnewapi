# Rerank

This page describes the document reranking endpoint: rerank a list of documents by relevance to a query.

**Method**: `POST`  
**Path**: `/v1/rerank`

### Authorization

Use Bearer Token authentication.

- **Format**: `Authorization: Bearer <token>` (e.g. `Authorization: Bearer sk-xxxxxx`)
- **Location**: `header`

### Request Body

`Content-Type: application/json`

| Parameter | Type | Required | Description |
|------|------|------|------|
| model | string | Yes | Rerank model ID |
| query | string | Yes | Query text |
| documents | array\<string \| object\> | Yes | List of documents to rerank |
| top_n | integer | No | Return the top N results |
| return_documents | boolean | No | Whether to return document content in results; default `false` |

### Response

- **200**: On success, returns `application/json` with a structure similar to:

```json
{
  "id": "string",
  "results": [
    {
      "index": 0,
      "relevance_score": 0,
      "document": {}
    }
  ],
  "meta": {}
}
```

- `results` are sorted by relevance to the query from highest to lowest; `index` is the original document index; `relevance_score` is the relevance score.

### Examples

<!-- tabs:start -->
#### **cURL**
```bash
curl -X POST "https://www.hxxopen.com/v1/rerank" \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "rerank-english-v2.0",
    "query": "什么是机器学习？",
    "documents": [
      "机器学习是人工智能的一个分支。",
      "今天天气不错。",
      "深度学习基于神经网络。"
    ],
    "top_n": 2
  }'
```

#### **JavaScript**
```js
const body = JSON.stringify({
  model: "rerank-english-v2.0",
  query: "什么是机器学习？",
  documents: [
    "机器学习是人工智能的一个分支。",
    "今天天气不错。",
    "深度学习基于神经网络。"
  ],
  top_n: 2
})

fetch("https://www.hxxopen.com/v1/rerank", {
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
    "https://www.hxxopen.com/v1/rerank",
    headers={
        "Authorization": "Bearer <API_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "rerank-english-v2.0",
        "query": "什么是机器学习？",
        "documents": [
            "机器学习是人工智能的一个分支。",
            "今天天气不错。",
            "深度学习基于神经网络。",
        ],
        "top_n": 2,
    },
)
print(response.json())
```
<!-- tabs:end -->
