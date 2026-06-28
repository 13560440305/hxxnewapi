# Quick Start

> Generate an API key and make your first call

Obtain an API Key from the hxxopen platform first.

## Direct API Call

<!-- tabs:start -->
#### **Python**
```py
import requests
import json

response = requests.post(
  url="https://www.hxxopen.com/v1/chat/completions",
  headers={
    "Authorization": "Bearer <API_KEY>",
    "Content-Type": "application/json",
  },
  data=json.dumps({
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Hello, please introduce yourself in one sentence."}
    ]
  })
)

print(response.json())
```

#### **JavaScript**
```js
fetch('https://www.hxxopen.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer <API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'user', content: 'Hello, please introduce yourself in one sentence.' },
    ],
  }),
})
```

#### **Curl**
```bash
curl 'https://www.hxxopen.com/v1/chat/completions' \
  -H 'Authorization: Bearer <API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "Hello, please introduce yourself in one sentence." }
    ]
  }'
```
<!-- tabs:end -->

To enable streaming, add `"stream": true` to the request body.

## Using the OpenAI SDK

First, install the OpenAI SDK:

<!-- tabs:start -->
#### **Python**
```bash
pip install openai
```

#### **JavaScript**
```bash
npm install openai
```
<!-- tabs:end -->

Replace `<HXXOPEN_API_KEY>` with your hxxopen Key. Note the key's expiration and quota limits. For available models, see the [Model Gallery](https://www.hxxopen.com/pricing) and copy the model name to use in your requests.

<!-- tabs:start -->
#### **Python**
```py
from openai import OpenAI

client = OpenAI(
    base_url="https://www.hxxopen.com/v1",
    api_key="<HXXOPEN_API_KEY>",
)

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello, please introduce yourself in one sentence."}
    ],
    temperature=0.7,
    max_tokens=1024,
)
print(completion.choices[0].message.content)
```

#### **JavaScript**
```js
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://www.hxxopen.com/v1',
  apiKey: '<HXXOPEN_API_KEY>',
});

const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'user', content: 'Hello, please introduce yourself in one sentence.' }
  ],
});

console.log(completion.choices[0].message);
```
<!-- tabs:end -->

## Next Steps

- Continue reading the sub-pages under "AI Model APIs" (Audio / Chat / Images / Video)
