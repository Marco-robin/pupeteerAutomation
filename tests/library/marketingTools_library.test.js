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

    describe('library test', () => {
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
        await page.type(selector.loginEmailInp, data.userEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toBe('Welcome back, Automation Test!');
      });


      
      test('Marketing Tools', async()=>{
       
        await page.waitForSelector(selector.library_maiMenu);
        await page.click(selector.library_maiMenu);
        await page.waitForSelector(selector.gettStar);
        var welcomeTxt = await page.$$eval(selector.gettStar,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');


      });

      test('Email Campaigns', async()=>{
       
        await page.waitForSelector(selector.library_maiMenu);
        await page.click(selector.library_maiMenu);
        await page.waitForSelector(selector.EmailCampaigns);
        await page.click(selector.EmailCampaigns);
        await page.waitForSelector(selector.libraryLabel);
        var welcomeTxt = await page.$$eval(selector.libraryLabel,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');


      });

      
      test('Brand Elements', async()=>{
       
        await page.waitForSelector(selector.library_maiMenu);
        await page.click(selector.library_maiMenu);
        await page.waitForSelector(selector.BrandElements);
        await page.click(selector.BrandElements);
        await page.waitForSelector(selector.libraryLabel);
        var welcomeTxt = await page.$$eval(selector.libraryLabel,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');


      });

      test('Marketing Resources', async()=>{
       
        await page.waitForSelector(selector.library_maiMenu);
        await page.click(selector.library_maiMenu);
        await page.waitForSelector(selector.marketingResources);
        await page.click(selector.marketingResources);
        await page.waitForSelector(selector.libraryLabel);
        var welcomeTxt = await page.$$eval(selector.libraryLabel,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');


      });
 
    });
});