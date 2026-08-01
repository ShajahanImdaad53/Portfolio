import urllib.request, json
url = 'https://api.github.com/users/ShajahanImdaad53/repos?per_page=100'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read())
for r in data:
    print(r['name'], "-", r['description'])
