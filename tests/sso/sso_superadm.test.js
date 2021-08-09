const puppeteer = require('puppeteer');
const data = require('../../helpers/dataStaging.json');
const selector = require('../../helpers/selectors.json');
const expect = require('expect');
const { TestScheduler } = require('jest');

describe('Aviator Test', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({headless : false, ignoreHTTPSErrors: true, args: [ '--ignore-certificate-errors', '--start-maximized'  ]});
    });

    afterEach(async () => {
        await page.close()
    });

    afterAll(async () => {
        await browser.close()
    })

    describe('sso super admin test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
        process.on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            browser.close();
          });
        await page.setViewport({width: 1920, height: 1080});
        await page.type(selector.loginEmailInp, data.super_adminEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('Welcome back,');
      });

    /*test('Store Login super admin test', async()=>{

    
      await page.waitForSelector(selector.select_subscriber);
      await page.click(selector.select_subscriber);
      await page.waitForSelector(selector.subscriber);
      await page.click(selector.subscriber);
      await page.waitForSelector(selector.store_loginBtn);
      const pageTarget = page.target(); 
      await page.click(selector.store_loginBtn); 
      const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); 
      const newPage = await newTarget.page();
      await newPage.waitForSelector(selector.bigcomerce_page);
      await newPage.close();


    });*/

    
    /*test('turn key login as super admin test', async()=>{

    
        await page.waitForSelector(selector.select_subscriber);
        await page.click(selector.select_subscriber);
        await page.waitForSelector(selector.subscriber);
        await page.click(selector.subscriber);
        await page.waitForSelector(selector.turn_keyBtn);
        const pageTarget = page.target(); 
        await page.click(selector.turn_keyBtn); 
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); 
        const newPage = await newTarget.page();
        await newPage.waitForSelector(selector.turnKey_notice);
        await newPage.close();
  
  
      });*/
    
    
   


    });
});