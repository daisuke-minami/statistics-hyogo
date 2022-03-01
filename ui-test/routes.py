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

# routesディレクトリ作成
if not os.path.exists("assets/routes"):
    os.mkdir("assets/routes")

# 環境変数から都道府県コードを取得
# load_dotenv()
# PREF_CODE = os.getenv('PREF_CODE')
# prefCode = PREF_CODE + '000'

# 都道府県一覧の取得
p = os.path.join(root_dir, 'assets/json/preflist.json')
with open(p) as j:
    prefList = json.load(j)
    prefCodes = [str(d.get('prefCode')).zfill(
        2) + '000' for d in prefList['result']]

# 市区町村一覧の取得
c = os.path.join(root_dir, 'assets/json/citylist.json')
with open(c) as j:
    cityList = json.load(j)
    cityCodes = [d.get('cityCode')
                 for d in cityList['result']]
    #  for d in cityList['result'] if d['prefCode'] == int(PREF_CODE)]

# routesを格納するリストの定義
# routes = []

# 統計分野を取得
c = os.path.join(root_dir, 'assets/json/contentsSetting.json')
with open(c) as j:
    contents = json.load(j)['list']
    fieldList = [d.get('fieldId') for d in contents]

    for field in fieldList:
        # routesを格納するリストの定義
        routes = []

        menuList = [d.get('menu')
                    for d in contents if d['fieldId'] == field]

        # 都道府県
        for menu in menuList[0]['prefecture']:
            cardList = [d.get('cardId') for d in menu['card']]

            for prefCode in prefCodes:
                routes.append('/prefecture/' + prefCode + '/' +
                              field + '/' + menu['menuId'] + '/')
                for cardId in cardList:
                    routes.append('/prefecture/' + prefCode + '/' +
                                  field + '/' + menu['menuId'] + '/' + cardId + '/')

        # 市区町村
        for menu in menuList[0]['city']:
            cardList = [d.get('cardId') for d in menu['card']]
            # print(cardList)

            for cityCode in cityCodes:
                routes.append('/city/' + cityCode + '/' +
                              field + '/' + menu['menuId'] + '/')
                for cardId in cardList:
                    routes.append('/city/' + cityCode + '/' +
                                  field + '/' + menu['menuId'] + '/' + cardId + '/')
        
        output = os.path.join(root_dir, 'assets/routes/'+ field + '_routes.json')
        with open(output, 'w') as f:
            json.dump(routes, f)
