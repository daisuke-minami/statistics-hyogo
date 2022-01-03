import os
import time
import json

from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

if not os.path.exists("ogp"):
    os.mkdir("ogp")

f = open('assets/json/cardRoutesSettings.json', 'r')
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
        "ogp/{}.png".format(path)
    )
