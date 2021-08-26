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
    });

    describe('sso subscriber test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
        process.on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            browser.close();
          });
        await page.setViewport({width: 1550, height: 1080});
        await page.type(selector.loginEmailInp, data.subscriberEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('Welcome back,');
      });

      test('Store Login subscriber test', async()=>{
      await page.waitForSelector(selector.store_Btn);
      const pageTarget = page.target(); 
      await page.click(selector.store_Btn); 
      const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); 
      const newPage = await newTarget.page();
      await newPage.waitForSelector(selector.bigcomerce_page);
      await newPage.close();
      await page.waitForSelector(selector.logoutBtn );
      await page.click(selector.logoutBtn);
      await page.waitForSelector(selector.alert);
      var welcomeTxt = await page.$$eval(selector.alert,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  

        });
      
       

    });
    
    
});

//SSO Admin

describe('SSO', () => {
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

  describe('sso Admin test', () => {
    beforeEach(async () => {
      page = await browser.newPage();
      await page.goto(data.aviatorUrl);
      await page.waitForSelector(selector.loginEmailInp);
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
      await expect(welcomeTxt[0]).toContain('Welcome back,');
    });

    test('Store Login Admin test', async()=>{
    await page.waitForSelector(selector.store_Admin);
    const pageTarget = page.target(); 
    await page.click(selector.store_Admin); 
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); 
    const newPage = await newTarget.page();
    await newPage.waitForSelector(selector.bigcomerce_page);
    await newPage.close();
    await page.waitForSelector(selector.logoutBtn );
    await page.click(selector.logoutBtn);
    await page.waitForSelector(selector.alert);
    var welcomeTxt = await page.$$eval(selector.alert,
        elements=> elements.map(item=>item.textContent));       
      await expect(welcomeTxt[0]).toContain('');

      });
    
     

  });
  
  
});