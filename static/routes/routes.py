import json
import os
import urllib.request
import pprint
import pandas as pd
import subprocess
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

#ルートディレクトリの設定(dataディレクトリ )
import pathlib
root_dir = pathlib.Path(__file__).parent.parent

# 環境変数から都道府県コードを取得
from dotenv import load_dotenv
load_dotenv()
PREF_CODE = os.getenv('PREF_CODE')

#市区町村一覧の取得
c = os.path.join(root_dir, 'codes/citylist.json')
with open(c) as j:
    cityList = json.load(j)
    cityCodes = [d.get('cityCode') for d in cityList['result']]

# statisticsClassを取得
c = os.path.join(root_dir, 'setting.json')
with open(c) as j:
    statistics = json.load(j)
    statisticsClass = [d.get('id') for d in statistics]

#routesを格納するリストの定義
routes = []

#chartClassの定義
chartClass =['prefecture','city','prefectureRank','cityRank']

# routes設定
for item in statisticsClass:

    # contentsAllの取得
    path = os.path.join(root_dir, 'pagesetting')
    j = open(path + '/' + item + '.json','r')
    contentsAll = json.load(j)

    # prefecture
    routes.append('/prefecture/' + PREF_CODE + '/' + item + '/')
    for d in contentsAll['prefecture']:
        routes.append('/prefecture/' + PREF_CODE + '/' + item + '/' + d['titleId'] +'/')

    # prefectureRank
    routes.append('/prefectureRank/' + PREF_CODE + '/' + item + '/')
    for d in contentsAll['prefecture']:
        if d['isRank']==True:
            routes.append('/prefectureRank/' + PREF_CODE + '/' + item + '/' + d['titleId'] +'/')

    # city
    for c in cityCodes:
        routes.append('/city/' + PREF_CODE + '/' + c + '/' + item + '/')
        for d in contentsAll['city']:
            routes.append('/city/' + PREF_CODE + '/' + c + '/' + item + '/' + d['titleId'] +'/')

    # cityRank
    routes.append('/cityRank/' + PREF_CODE + '/' + item + '/')
    for d in contentsAll['city']:
        if d['isRank']==True:
            routes.append('/cityRank/' + PREF_CODE + '/' + item + '/' + d['titleId'] +'/')



output = os.path.join(root_dir, 'routes/routes.json')
with open(output, 'w') as f:
    json.dump(routes, f)


