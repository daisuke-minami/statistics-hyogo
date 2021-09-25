import json
import os
import pandas as pd
import estat
import resas
import pathlib

#ルートディレクトリの設定
root_dir = pathlib.Path(__file__).parent.parent.parent

#pagesettingディレクトリ配下のファイル名を取得
path = os.path.join(root_dir, 'static/pagesetting')
files = os.listdir(path)
files_file = [f for f in files if os.path.isfile(os.path.join(path, f))]

#chartClassの設定
# chartClass = ['prefecture','city','prefectureRank','cityRank']
chartClass = ['prefecture','city']

def saveEstatResponse(contents,statistics_type):
    #estatAPIのパラメータ設定
    params = estat.setEstatParams(contents['estatParams'],statistics_type)

    #estatAPIのレスポンス取得
    res = estat.getEstatAPIResponse(params)

    #ファイルに保存
    fileName = contents['titleId']
    downloadPath = os.path.join(downloadDirectory, fileName + '.json')
    estat.saveJson(res,downloadPath,ensure_ascii=False)


#contentsの生成
for item in files_file:
    #statisticsClassディレクトリを作成
    statistics_class = item.replace('.json', '')
    contentsDirectory = os.path.join(root_dir, 'static/pagecontents/'+statistics_class)
    pathlib.Path(contentsDirectory).mkdir(exist_ok=True)

    for type in chartClass:
        #chartClassディレクトリを作成
        downloadDirectory = os.path.join(contentsDirectory, type)
        pathlib.Path(downloadDirectory).mkdir(exist_ok=True)

        #contentsの取得（都道府県）
        j = open(path + '/' + item,'r')
        contentsList = json.load(j)[type]

        for contents in contentsList:
            if 'estatParams' in contents:
                saveEstatResponse(contents,type)
            # if 'resasUrl' in contents:
            #     resas.saveResasResponse(contents,downloadDirectory,type)


