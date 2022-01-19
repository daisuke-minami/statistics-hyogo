from dotenv import load_dotenv
import pathlib
import json
import os
import urllib.request
import pprint
import pandas as pd
import subprocess
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# ルートディレクトリの設定(dataディレクトリ )
root_dir = pathlib.Path(__file__).parent.parent

# 環境変数から都道府県コードを取得
load_dotenv()
PREF_CODE = os.getenv('PREF_CODE')
prefCode = PREF_CODE + '000'
prefName = '兵庫県'

# 市区町村一覧の取得
c = os.path.join(root_dir, 'data/codes/citylist.json')
with open(c) as j:
    cityList = json.load(j)
    cityCodes = [d.get('cityCode')
                 for d in cityList['result'] if d['prefCode'] == int(PREF_CODE)]
    # print(cityCodes)

# print(cityCodes)

# #routesを格納するリストの定義
routes = []

# 統計分野を取得
c = os.path.join(root_dir, 'assets/json/contentsSetting.json')
with open(c) as j:
    contents = json.load(j)['list']
    fieldList = [d.get('fieldId') for d in contents]

    for field in fieldList:
        menuList = [d.get('menu')
                    for d in contents if d['fieldId'] == field]

        # 都道府県
        for menu in menuList[0]['prefecture']:
            cardList = [d.get('cardId') for d in menu['card']]
            for cardId in cardList:
                j = {
                    "path": '/prefecture/' + prefCode + '/' + field + '/' + menu['menuId'] + '/' + cardId + '/',
                    "title": 'テスト',
                    "ogpWidth": 959,
                    "ogpHeight": 500
                }
                routes.append(j)
                # print(routes)

        # 市区町村
        for menu in menuList[0]['city']:
            cardList = [d.get('cardId') for d in menu['card']]
            for cityCode in cityCodes:
                for cardId in cardList:
                    j = {
                        "path": '/city/' + cityCode + '/' + field + '/' + menu['menuId'] + '/' + cardId + '/',
                        "title": 'テスト',
                        "ogpWidth": 959,
                        "ogpHeight": 500
                    }
                    routes.append(j)


output = os.path.join(root_dir, 'assets/json/ogpSettings.json')
with open(output, 'w') as f:
    json.dump(routes, f)
