import json
import os
import pandas as pd
import estat
import resas
import pathlib

#ルートディレクトリの設定
root_dir = pathlib.Path(__file__).parent.parent.parent

# statisticsClassを取得
c = os.path.join(root_dir, 'static/setting.json')

with open(c) as j:
    setting = json.load(j)
    statisticsClass = [d.get('id') for d in setting['statisticsClass']]

#chartClassの定義
chartClass =['prefecture','city']

def saveEstatResponse(contents,statistics_type):
    #estatAPIのパラメータ設定
    params = estat.setEstatParams(contents['estatParams'],statistics_type)

    #estatAPIのレスポンス取得
    res = estat.getEstatAPIResponse(params)

    #ファイルに保存
    fileName = contents['titleId']
    downloadPath = os.path.join(down, fileName + '.json')
    estat.saveJson(res,downloadPath,ensure_ascii=False)


#contentsの生成
for item in statisticsClass:

    #ディレクトリを作成
    directory = os.path.join(root_dir, 'static/pagecontents/'+item)
    pathlib.Path(directory).mkdir(exist_ok=True)

    for type in chartClass:
        #chartClassディレクトリを作成
        down = os.path.join(directory, type)
        pathlib.Path(down).mkdir(exist_ok=True)

        #contentsの取得（都道府県）
        path = os.path.join(root_dir, 'static/pagesetting')
        j = open(path + '/' + item+'.json','r')
        contentsList = json.load(j)[type]

        for contents in contentsList:
            if 'estatParams' in contents:
                saveEstatResponse(contents,type)
            # if 'resasUrl' in contents:
            #     resas.saveResasResponse(contents,down,type)


