import os
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# ogpディレクトリを作成（dist直下）
if not os.path.exists("ogp"):
    os.mkdir("ogp")

#ChromeDriverの設定
options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)


driver.set_window_size(959, 570)

driver.get("http://localhost:8000?ogp=true")

driver.save_screenshot("ogp/test.png")