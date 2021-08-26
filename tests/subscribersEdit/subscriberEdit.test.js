const puppeteer = require('puppeteer');
const data = require('../../helpers/dataStaging.json');
const selector = require('../../helpers/selectors.json');
const expect = require('expect');
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

    describe('Subscriber Edit test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
        await page.screenshot({ path: data.loginCapture });
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
        await expect(welcomeTxt[0]).toContain('Welcome back');
      });

      test('Subdomain', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.sub_subdomain);
        await page.waitForSelector(selector.updateSubscriberBtn);
        await page.click(selector.updateSubscriberBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
            elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('');

      });

      test('Use Quote Singnup Flow', async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.UseQuote);
                if ((await page.$(selector.UseQuote)) !== null) {
                await page.click(selector.UseQuote);
                    } 
            await page.waitForSelector(selector.updateSubscriberBtn);
            await page.click(selector.updateSubscriberBtn);
            await page.waitForSelector(selector.flash_notice);
            var welcomeTxt = await page.$$eval(selector.flash_notice,
            elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toContain('');

      });
      

      test('Klaviyo', async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        



      })





      


    });

});