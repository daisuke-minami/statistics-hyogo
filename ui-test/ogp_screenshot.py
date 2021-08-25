import os
import time
import json
import pathlib
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

#ルートディレクトリの設定
root_dir = pathlib.Path(__file__).parent.parent

#routesを取得
path = os.path.join(root_dir, 'static/routes/routes.json')
j = open(path, 'r')
routes = json.load(j)
# print(routes)

# ogpディレクトリを作成
if not os.path.exists("ogp"):
    os.mkdir("ogp")

# #ChromeDriverの設定
options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")
driver = webdriver.Chrome(options=options)

#ChromeDriverの設定
# chromePath = os.path.join(root_dir, 'node_modules/chromedriver/bin/chromedriver')
# driver = webdriver.Chrome(executable_path=chromePath)
# driver.set_window_size(959, 500)


for path in routes:
    driver.set_window_size(959, 500)
    driver.get(
        ("http://localhost:3000/{}?ogp=true".format(path))
        )
    driver.save_screenshot(
            "ogp/{}.png".format(path)
        )


# #OGP画像の生成（都道府県）
# for item in files_file:

#     #contentsIdディレクトリを作成
#     contents_id = item.replace('.json', '')
#     contentsDirectory = os.path.join(root_dir, 'data/pagecontents/'+contents_id)
#     pathlib.Path(contentsDirectory).mkdir(exist_ok=True)


# for path in PATHS.items():
#     driver.set_window_size(959, 500)
#     driver.get(
#         "http://localhost:3000{}?ogp=true".format(path)
#     )


#     c = os.path.join(root_dir, 'citylist.json')

#     driver.save_screenshot(
#         "ogp/{}.png".format(
#             path if lang == "ja" else "{}/{}".format(lang, path)
#         )
#     )

# for lang in ("ja", "en", "zh-cn", "zh-tw", "ko", "ja-basic"):
#     if not os.path.exists("ogp/{}".format(lang)):
#         os.mkdir("ogp/{}".format(lang))
#     for path, size in PATHS.items():
#         driver.set_window_size(*size)
#         driver.get(
#             "http://localhost:8000{}?ogp=true".format(
#                 path if lang == "ja" else "/{}{}".format(lang, path)
#             )
#         )
#         path = path.replace("/cards/", "").replace("/", "_")
#         if ('heatmap' in path):
#             time.sleep(20)
#         driver.save_screenshot(
#             "ogp/{}.png".format(
#                 path if lang == "ja" else "{}/{}".format(lang, path)
#             )
#         )




# # ogpディレクトリを作成（dist直下）
# if not os.path.exists("ogp"):
#     os.mkdir("ogp")

# #ChromeDriverの設定
# options = webdriver.ChromeOptions()
# options.add_argument("--headless")
# options.add_argument("--hide-scrollbars")