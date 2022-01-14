from selenium import webdriver
import selenium
import time
from selenium.webdriver.common.keys import Keys
PATH = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(PATH)


driver.get("http://localhost:3001/register")
driver.maximize_window()
time.sleep(2)

def userRegister(username, password, email, date):
    robot = driver.find_element_by_id("usernameRegister")
    robot.send_keys(username)
    robot = driver.find_element_by_id("passwordRegister")
    robot.send_keys(password)
    robot = driver.find_element_by_id("emailRegister")
    robot.send_keys(email)
    robot = driver.find_element_by_id("dateRegister")
    robot.send_keys(date)
    robot = driver.find_element_by_id("submitButtonRegister")
    robot.send_keys(Keys.RETURN)
def userLogin(username, password):
    robot = driver.find_element_by_id("loginUsername")
    robot.send_keys(username)
    robot = driver.find_element_by_id("loginPassword")
    robot.send_keys(password)
    robot = driver.find_element_by_id("submitButtonLogin")
    robot.send_keys(Keys.RETURN)
def updatePassword(oldpassword, newpassword):
    robot = driver.find_element_by_id("submitUpdateB")
    robot.send_keys(Keys.RETURN)
    robot = driver.find_element_by_id("oldpassword")
    robot.send_keys(oldpassword)
    robot = driver.find_element_by_id("newpassword")
    robot.send_keys(newpassword)
    robot = driver.find_element_by_id("oldpassword")
    robot.send_keys(oldpassword)
    robot = driver.find_element_by_id("submitUpdate")
    robot.send_keys(Keys.RETURN)
def makePost(postText):
    robot = driver.find_element_by_id("homeButton")
    robot.send_keys(Keys.RETURN)
    robot = driver.find_element_by_id("textareaPost")
    robot.send_keys(postText)
    robot = driver.find_element_by_id("createPost")
    robot.send_keys(Keys.RETURN)
def deleteUser():
    robot = driver.find_element_by_id("deleteButton")
    robot.send_keys(Keys.RETURN)

userRegister("SeleniumBot", "Seleniumbot12345", "selenium@google.com", "11112020")
time.sleep(2)
userLogin("SeleniumBot", "Seleniumbot12345")
time.sleep(1)
updatePassword("Seleniumbot12345", "Seleniumbot12345%@$@")
time.sleep(1)
userLogin("SeleniumBot", "Seleniumbot12345%@$@")
time.sleep(1)
makePost("Testing the testing test")
driver.get("http://localhost:3001/profile")
time.sleep(1)
deleteUser()

