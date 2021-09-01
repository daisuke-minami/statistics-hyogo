import json
import os
import time
import urllib.parse
import urllib.request
import pandas as pd
import pathlib

#ルートディレクトリの設定(dataディレクトリ )
root_dir = pathlib.Path(__file__).parent.parent

#都道府県一覧の取得
c = os.path.join(root_dir, 'codes/preflist.json')
with open(c) as j:
    prefList = json.load(j)

#市区町村一覧の取得
c = os.path.join(root_dir, 'codes/citylist.json')
with open(c) as j:
    cityList = json.load(j)

#環境変数からESRAT-APPIDを取得
from dotenv import load_dotenv
load_dotenv()
ESTAT_APPID = os.getenv('ESTAT_APPID')

#estatAPIのパラメータセット（都道府県）
def setEstatParamsPref(params,type):

    #appIdの設定
    p = {'appId':ESTAT_APPID}

    #cdAreaの設定
    if type == 'prefecture':
        prefCodes = [d.get('prefCode') for d in prefList['result']]
        prefCodesStr = [f'{n:02}'+'000' for n in prefCodes]
        # print(prefCodesStr)
        p['cdArea'] = ','.join(prefCodesStr)
    if type == 'city':
        cityCodes = [d.get('cityCode') for d in cityList['result']]
        p['cdArea'] = ','.join(cityCodes)
        # print(cityCodes)

    #statsDataIdの設定
    p['statsDataId'] = params['statsDataId']

    #cdCat01,cdCat02,cdTabの設定
    if('categories' in params):
        categories = params['categories']
        if 'cdCat01' in categories[0]:
            p['cdCat01'] = ','.join([d.get('cdCat01') for d in categories])
        if 'cdCat02' in categories[0]:
            p['cdCat02'] = ','.join([d.get('cdCat02') for d in categories])
        if 'cdTab' in categories[0]:
            p['cdTab'] = ','.join([d.get('cdTab') for d in categories])

    return p

#estatAPIのレスポンス取得
def getEstatAPIResponse(params):
    url = 'http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?'
    url += urllib.parse.urlencode(params)
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode())

def saveJson(data,downloadPath,**kwargs):
    with open(downloadPath, 'w') as f:
        json.dump(data, f, **kwargs)

