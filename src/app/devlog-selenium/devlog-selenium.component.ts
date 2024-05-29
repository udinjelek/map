import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devlog-selenium',
  templateUrl: './devlog-selenium.component.html',
  styleUrls: ['./devlog-selenium.component.scss']
})
export class DevlogSeleniumComponent implements OnInit{

ngOnInit(): void {
    window.scrollTo(0, 0);
}


pythoncode = `
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
from datetime import datetime
import csv

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")  # Open Browser in maximized mode
chrome_options.add_argument("--no-sandbox")  # Bypass OS security model
chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

# Path to the ChromeDriver executable
chromedriver_path = 'chromedriver.exe'  # Update this path

# Setup Chrome driver
service = Service(chromedriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)


    
def main():
    url_used = convert_url(dataInput)
    print(url_used)
    now_time = datetime.now().strftime('%Y%m%d_%H%M%S')
    csv_file = 'result_parsing_'+ now_time +'.csv'
    with open(csv_file, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow(['search_key','min_price','max_price','page','no_item','shop_name','shop_loc','product_rating','product_sales','product_name','product_price','product_link'])  
                            
    try:
        for pageNo in range(1,100):
            driver.get(url_used + '&page=' + str(pageNo))
            print(url_used + '&page=' + str(pageNo))
           
            pageBottom(driver) 

            is_page_item_found = False
            try:
                # element = driver.find_element(By.CSS_SELECTOR, "div:contains('Oops, produk nggak ditemukan')")
                element_page_not_found = driver.find_element(By.CLASS_NAME,'css-1852zva')
                # print(element_page_not_found)
                if element_page_not_found.text != 'Oops, produk nggak ditemukan':
                     print(element_page_not_found.text)
                     is_page_item_found = True
            except Exception as e:
                is_page_item_found = True
            print('pageNo:', pageNo)
            if is_page_item_found == False:
                break
            
            # Find all div elements with class 'css-1asz3by'
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[@data-testid='divSRPContentProducts'][@data-ssr='contentProductsSRPSSR']"))
            )
            div_element = driver.find_element(By.XPATH, "//div[@data-testid='divSRPContentProducts'][@data-ssr='contentProductsSRPSSR']")
            
            div_element_rows = div_element.find_elements(By.CLASS_NAME, 'css-jza1fo')
            item_no = 0
            try:
                for div_element_row in div_element_rows:
                    try:
                        div_element_cards = div_element_row.find_elements(By.CLASS_NAME, 'css-llwpbs')
                    except NoSuchElementException:
                        continue
                    
                    for div_element_card in div_element_cards:
                        item_no += 1
                        try:
                            div_description = div_element_card.find_element(By.CLASS_NAME, 'css-1asz3by')
                        except NoSuchElementException:
                            continue
                        
                        

                        div_shop_name = div_element_card.find_element(By.CLASS_NAME, 'prd_link-shop-name')
                        shop_name = div_shop_name.text

                        div_shop_loc = div_element_card.find_element(By.CLASS_NAME, 'prd_link-shop-loc')
                        shop_loc = div_shop_loc.text

                        try:
                            div_product_rating = div_element_card.find_element(By.CLASS_NAME, 'prd_rating-average-text')
                            product_rating = div_product_rating.text
                        except Exception as e:    
                            product_rating = 'none'
                        
                        try:
                            div_product_sales = div_element_card.find_element(By.CLASS_NAME, 'prd_label-integrity')
                            product_sales = div_product_sales.text
                        except Exception as e:    
                            product_sales = 'none'

                        div_product_name = div_element_card.find_element(By.CLASS_NAME, 'prd_link-product-name')
                        product_name = div_product_name.text

                        div_product_price = div_element_card.find_element(By.CLASS_NAME, 'prd_link-product-price')
                        product_price = div_product_price.text
                        print(f"Product {item_no} price: {product_price}")

                        anchor_tag = div_description.find_element(By.XPATH, ".//a")
                        product_link = anchor_tag.get_attribute("href")
                            # print(f"Product {item_no} href: {a_href}")
                        

                        with open(csv_file, 'a', encoding="utf-8", newline='') as csvfile:
                            csvwriter = csv.writer(csvfile)
                            csvwriter.writerow([dataInput['search_key'],dataInput['min_price'],dataInput['max_price'],pageNo,item_no,shop_name,shop_loc,product_rating,product_sales,product_name,product_price,product_link])  
                            

            except Exception as e:
                print("Error processing product div:", e ," div_no: " ,item_no)
            
        # input("Press Enter to close the browser and end the script...")
    finally:
        # Close the browser
        driver.quit()

def convert_url(data):
    
    search_key = data["search_key"].replace(' ', '%20')
    result = "{}search?pmax={}&pmin={}&q={}"
    result = result.format(data["base_web"], 
                           data["max_price"], 
                           data["min_price"], 
                           search_key )
    return result

def pageBottom(driver):
    bottom=False
    a=0
    while not bottom:
        new_height = driver.execute_script("return document.body.scrollHeight")
        driver.execute_script(f"window.scrollTo(0, {a});")
        if a > new_height:
            bottom=True
        a+=10

dataInput = {
                'base_web' : "https://www.tokopedia.com/",
                'search_key' : 'Lenovo LOQ 15AHP9',
                'min_price' :  5000000,
                'max_price' : 21000000
            }

main()
`

}
