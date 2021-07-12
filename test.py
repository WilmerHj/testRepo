import requests as rq
import json

url = "http://localhost:5000/api/items"
data = {'name': 'Apples'}
headers = {'content-type': 'application/json'}

post = rq.post(url, data = json.dumps(data), headers=headers)
get = rq.get("http://localhost:5000/api/items")
print(post, get)

print(post.text)