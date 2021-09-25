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

# contentsディレクトリ配下のファイル名を取得
path = os.path.join(root_dir, 'pagesetting')
files = os.listdir(path)
files_file = [f for f in files if os.path.isfile(os.path.join(path, f))]

#routesを格納するリストの定義
routes = []

#chartClassの定義
chartClass =['prefecture','city','prefectureRank','cityRank']

def base_route(statisticsClass,chartClass):
    routes.append(statisticsClass +'/'+ chartClass +'/'+ PREF_CODE)


#基本ページのroute設定
for item in files_file:
    statisticsClass = item.replace('.json', '')

    for c in chartClass:
        routes.append(statisticsClass +'/'+ c +'/'+ PREF_CODE)

# timechart(都道府県)のroutes設定
for item in files_file:
    #contentsIdの取得
    statisticsClass = item.replace('.json', '')

    #titleIdの取得
    j = open(path + '/' + item,'r')
    contents_all = json.load(j)
    contents_prefecture = contents_all['prefecture']
    title_id = [d.get('titleId') for d in contents_prefecture]

    for t in title_id:
        routes.append(statisticsClass +'/prefecture/' + PREF_CODE + '/' + t )

# timechart(市区町村)のroutes設定
# for item in files_file:
#     #contentsIdの取得
#     contents_id = item.replace('.json', '')

#     #titleId（リスト）の取得
#     j = open(path + '/' + item,'r')
#     contents_all = json.load(j)
#     contents_city = contents_all['city']
#     title_id = [d.get('titleId') for d in contents_city]

#     for t in title_id:
#         for c in cityCodes:
#             routes.append(contents_id +'/' + t + '/timechart/city/' + c)

# rankchart(都道府県)のroutes設定
# for item in files_file:
#     #contentsIdの取得
#     contents_id = item.replace('.json', '')

#     #titleId（リスト）の取得
#     j = open(path + '/' + item,'r')
#     contents_all = json.load(j)
#     contents_prefecture = contents_all['prefecture']
#     title_id = [d.get('titleId') for d in contents_prefecture if d['isRank'] == True]

#     for t in title_id:
#         routes.append(contents_id +'/' + t + '/rankchart/prefecture/map' )
#         routes.append(contents_id +'/' + t + '/rankchart/prefecture/bar' )


# print(routes)
# routes.jsonの書き出し
output = os.path.join(root_dir, 'routes/routes.json')
with open(output, 'w') as f:
    json.dump(routes, f)


