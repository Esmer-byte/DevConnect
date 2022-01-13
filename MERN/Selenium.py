from selenium import webdriver
import selenium
import time
from selenium.webdriver.common.keys import Keys
PATH = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(PATH)


driver.get("http://localhost:3001/")
driver.maximize_window()