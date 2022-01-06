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
root_dir = pathlib.Path(__file__).parent.parent

#都道府県一覧の取得
c = os.path.join(root_dir, 'codes/preflist.json')
with open(c) as j:
    prefList = json.load(j)['result']

#市区町村一覧の取得
c = os.path.join(root_dir, 'codes/citylist.json')
with open(c) as j:
    cityList = json.load(j)['result']

# 環境変数から都道府県コードを取得
from dotenv import load_dotenv
load_dotenv()
PREF_CODE = os.getenv('PREF_CODE')

# 環境変数からRESAS-API-KEYを取得
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv('API_KEY')

def setResasParams(params,type):
    p = params
    if type == 'prefecture':
        p['prefCode'] = PREF_CODE
        p['cityCode'] = '-'
    return p

def getResasResponse(contents,prefCode,cityCode):
    # resasAPIのパラメータ設定
    params = contents['resasParams']
    params['prefCode'] = prefCode
    params['cityCode'] = cityCode

    #resasAPIのURL
    url = 'https://opendata.resas-portal.go.jp/' + contents['resasUrl'] + '?'
    url += urllib.parse.urlencode(params)

    req = urllib.request.Request(url, headers={'X-API-KEY': API_KEY})
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode())

    return res['result']['data']

def saveResasResponse(contents,downloadDirectory,chartClass):
    res = {}

    #都道府県の場合
    if chartClass == 'prefecture' or chartClass == 'prefectureRank':
        for p in prefList:
            prefCode = p['prefCode']
            cityCode = '-'
            res[prefCode] = getResasResponse(contents,prefCode,cityCode)

    #市区町村の場合
    if chartClass == 'city' or chartClass == 'cityRank':
        for c in cityList:
            prefCode = PREF_CODE
            cityCode = c['cityCode']
            res[cityCode] = getResasResponse(contents,prefCode,cityCode)

    # ファイルに保存
    fileName = contents['titleId']
    downloadPath = os.path.join(downloadDirectory, fileName + '.json')
    with open(downloadPath, 'w') as f:
        json.dump(res, f, ensure_ascii=False, indent=4)

