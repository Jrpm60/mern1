import requests

urls = ['http://localhost:8080', 'http://localhost:8080/abc', 'http://localhost:8080/xyz']


for url in urls:
    response = requests.get(url, timeout=5)
    print(response.status_code) 
    print(response.text)