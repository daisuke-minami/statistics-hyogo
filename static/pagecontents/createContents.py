import json
import os
import pandas as pd
import estat
import pathlib

#ルートディレクトリの設定
root_dir = pathlib.Path(__file__).parent.parent.parent

#pagesettingディレクトリ配下のファイル名を取得
path = os.path.join(root_dir, 'data/pagesetting')
files = os.listdir(path)
files_file = [f for f in files if os.path.isfile(os.path.join(path, f))]

#contentsの生成（都道府県）
for item in files_file:

    #contentsIdディレクトリを作成
    contents_id = item.replace('.json', '')
    contentsDirectory = os.path.join(root_dir, 'static/pagecontents/'+contents_id)
    pathlib.Path(contentsDirectory).mkdir(exist_ok=True)

    #prefectureディレクトリの作成
    downloadDirectory = os.path.join(contentsDirectory, 'prefecture')
    pathlib.Path(downloadDirectory).mkdir(exist_ok=True)

    #contentsの取得（都道府県）
    j = open(path + '/' + item,'r')
    contentsPref = json.load(j)['prefecture']

    #estatAPIのレスポンスをJSONファイルに保存
    for contents in contentsPref:

        #estatAPIのパラメータ設定
        params = estat.setEstatParamsPref(contents['params'],'prefecture')

        #estatAPIのレスポンス取得
        res = estat.getEstatAPIResponse(params)

        #ファイルに保存
        fileName = contents['titleId']
        downloadPath = os.path.join(downloadDirectory, fileName + '.json')
        estat.saveJson(res,downloadPath,ensure_ascii=False)

#contentsの生成（市区町村）
for item in files_file:

    #contentsIdディレクトリを作成
    contents_id = item.replace('.json', '')
    contentsDirectory = os.path.join(root_dir, 'static/pagecontents/'+contents_id)
    pathlib.Path(contentsDirectory).mkdir(exist_ok=True)

    #cityディレクトリの作成
    downloadDirectory = os.path.join(contentsDirectory, 'city')
    pathlib.Path(downloadDirectory).mkdir(exist_ok=True)

    #contentsの取得（都道府県）
    j = open(path + '/' + item,'r')
    contentsCity = json.load(j)['city']

    #estatAPIのレスポンスをJSONファイルに保存
    for contents in contentsCity:

        #estatAPIのパラメータ設定
        params = estat.setEstatParamsPref(contents['params'],'city')

        #estatAPIのレスポンス取得
        res = estat.getEstatAPIResponse(params)

        #ファイルに保存
        fileName = contents['titleId']
        downloadPath = os.path.join(downloadDirectory, fileName + '.json')
        estat.saveJson(res,downloadPath,ensure_ascii=False)