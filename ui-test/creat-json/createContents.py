import json
import os
import pandas as pd
import estat
import resas
import pathlib

# ルートディレクトリの設定
root_dir = pathlib.Path(__file__).parent.parent.parent

# FieldIdを取得
c = os.path.join(root_dir, 'static/setting.json')

with open(c) as j:
    setting = json.load(j)
    FieldId = [d.get('id') for d in setting['FieldId']]

# chartClassの定義
chartClass = ['prefecture', 'city']


def saveEstatResponse(contents):
    params = {'appId': ESTAT_APPID}
    params['statsDataId'] = contents['estatParams']['statsDataId']
    if('cdCat01' in contents['estatParams']):
        params['cdCat01'] = ','.join(
            [d for d in contents['estatParams']['cdCat01']])

    # prefecture
    params['cdArea'] = '28000'
    res = estat.getEstatAPIResponse(params)
    fileName = contents['titleId']
    downloadPath = os.path.join(down, fileName + '.json')
    estat.saveJson(res, downloadPath, ensure_ascii=False)


# contentsの生成
for item in FieldId:

    # ディレクトリを作成
    directory = os.path.join(root_dir, 'static/pagecontents/'+item)
    pathlib.Path(directory).mkdir(exist_ok=True)

    params = {'appId': ESTAT_APPID}

    # for type in chartClass:
    #     #chartClassディレクトリを作成
    #     down = os.path.join(directory, type)
    #     pathlib.Path(down).mkdir(exist_ok=True)

    #     #contentsの取得（都道府県）
    #     path = os.path.join(root_dir, 'data/pagesetting')
    #     j = open(path + '/' + item+'.json','r')
    #     contentsList = json.load(j)[type]

    #     for contents in contentsList:
    #         if 'estatParams' in contents:
    #             saveEstatResponse(contents,type)
    #         # if 'resasUrl' in contents:
    #         #     resas.saveResasResponse(contents,down,type)

    # prefecture
    down = os.path.join(directory, 'prefecture')
    pathlib.Path(down).mkdir(exist_ok=True)

    path = os.path.join(root_dir, 'data/pagesetting')
    j = open(path + '/' + item+'.json', 'r')
    contentsList = json.load(j)['prefecture']

    for contents in contentsList:
        if 'estatParams' in contents:
            params['statsDataId'] = contents['estatParams']['statsDataId']
            params['cdArea'] = '28000'
            if('cdCat01' in contents['estatParams']):
                params['cdCat01'] = ','.join(
                    [d for d in contents['estatParams']['cdCat01']])

            res = estat.getEstatAPIResponse(params)
            fileName = contents['titleId']
            downloadPath = os.path.join(down, fileName + '.json')
            estat.saveJson(res, downloadPath, ensure_ascii=False)

    # saveEstatResponse(contents, type)
