const puppeteer = require('puppeteer');
const data = require('../../helpers/dataStaging.json');
const selector = require('../../helpers/selectors.json');
const expect = require('expect');
const { TestScheduler } = require('jest');
const { testTimeout } = require('../../jest.config');


describe('Aviator Test', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({headless : false, ignoreHTTPSErrors: true, args: [ '--ignore-certificate-errors', '--start-maximized' ]});
        
    });

    afterEach(async () => {
        await page.close()
    });

    afterAll(async () => {
        await browser.close()
    })

    describe('Customer Account test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
        await page.screenshot({ path: data.loginCapture });
        process.on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            browser.close();
          });
        await page.setViewport({width: 1550, height: 1080});
        await page.type(selector.loginEmailInp, data.userEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toBe('Welcome back, Automation Test!');
      });

  
      var available = await page.waitForSelector(selector.Active);
      if (available) 
      
    test('Activate Customer Account test',async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
        page.on('dialog', async dialog => {
           await dialog.accept();
         });  
      await page.waitForSelector(selector.open_accountbtn);
      await page.click(selector.open_accountbtn).catch(e => console.log(e));
      await page.waitForSelector(selector.flash_notice);
           var succesopenacounttxt=await page.$$eval(selector.flash_notice, 
            elements=>elements.map(item=>item.textContent));
          await expect(succesopenacounttxt[0]).toContain('');
  
  
       });
  
  
     test ('Close Customer Account test', async()=>{
  
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.close_accountbtn);
      await page.click(selector.close_accountbtn);
      await page.waitForSelector(selector.consumer_closed_reason);
      await page.$eval(selector.customer_first_name, el=>el.value='');
      await page.type(selector.consumer_closed_reason,data.colsed_reason);
      await page.waitForSelector(selector.closeaccount_modal);
      await page.click(selector.closeaccount_modal);
      await page.waitForSelector(selector.flash_notice);
        var seccescloseacounttxt=await page.$$eval(selector.flash_notice,
          elements=>elements.map(item=>item.textContent));
      await expect(seccescloseacounttxt[0]).toContain('');
  
      });




   
   
    
  });
  
});