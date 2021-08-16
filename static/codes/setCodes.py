import json
import os
import urllib.request
import pprint
import pandas as pd
import pathlib
import subprocess
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

#ルートディレクトリの設定(dataディレクトリ )
import pathlib
root_dir = pathlib.Path(__file__).parent

# 環境変数から都道府県コードを取得
from dotenv import load_dotenv
load_dotenv()
PREF_CODE = os.getenv('PREF_CODE')

# 環境変数からRESAS-API-KEYを取得
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv('API_KEY')

# RESAS-APIから都道府県一覧を取得を取得
url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
req = urllib.request.Request(url, headers={'X-API-KEY': API_KEY})
with urllib.request.urlopen(req) as response:
    data = response.read()
prefList = json.loads(data.decode())

# 都道府県一覧の書き出し
c = os.path.join(root_dir, 'preflist.json')
with open(c, 'w') as f:
    json.dump(prefList, f, ensure_ascii=False, indent=4)


# RESAS-APIから市区町村一覧を取得
url_base = 'https://opendata.resas-portal.go.jp/api/v1/cities?'
p = {'prefCode': PREF_CODE}
url = url_base + urllib.parse.urlencode(p)
req = urllib.request.Request(url, headers={'X-API-KEY': API_KEY})
with urllib.request.urlopen(req) as response:
    data = response.read()
cityList = json.loads(data.decode())

# 市区町村一覧の書き出し
c = os.path.join(root_dir, 'citylist.json')
with open(c, 'w') as f:
    json.dump(cityList, f, ensure_ascii=False, indent=4)
