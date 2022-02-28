import os
import time
import json
from selenium import webdriver

if not os.path.exists("static/ogp"):
    os.mkdir("static/ogp")

f = open('assets/json/ogpSettings.json', 'r')
card_data = json.load(f)

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)

for value in card_data:
    driver.set_window_size(*(value['ogpWidth'], value['ogpHeight']))
    path = value['path']

    driver.get(
        "https://statistics-hyogo.com{}?ogp=true".format(path)
    )


    path = path.replace("/", "_")

    time.sleep(20)
    driver.save_screenshot(
        "static/ogp/{}.png".format(path)
    )
