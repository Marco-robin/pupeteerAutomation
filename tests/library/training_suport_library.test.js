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
        await page.setViewport({width: 1550, height: 1080});
        await page.type(selector.loginEmailInp, data.subscriberEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toBe('Welcome back, Automation Test!');
      });


      
     test('Training & Support',async()=>{
       
        await page.waitForSelector(selector.library_maiMenu);
        await page.click(selector.library_maiMenu);
        await page.waitForSelector(selector.libraryLabel);
        var installationtxt =await page.$$eval(selector.libraryLabel, 
            elements=>elements.map(item=>item.textContent));
            await expect(installationtxt[0]).toContain('');
            await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

     });

     test('Orientation Program', async()=>{
      
      await page.waitForSelector(selector.library_maiMenu);
      await page.click(selector.library_maiMenu);
      await page.waitForSelector(selector.OrientationProgram);
      await page.click(selector.OrientationProgram);
      await page.waitForSelector(selector.libraryLabel);
      var installationtxt =await page.$$eval(selector.libraryLabel, 
        elements=>elements.map(item=>item.textContent));
        await expect(installationtxt[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

     });
      
     test('Continuous Education', async()=>{

      await page.waitForSelector(selector.library_maiMenu);
      await page.click(selector.library_maiMenu);
      await page.waitForSelector(selector.continuousEducation);
      await page.click(selector.continuousEducation);
      await page.waitForSelector(selector.libraryLabel);
      var installationtxt =await page.$$eval(selector.libraryLabel, 
        elements=>elements.map(item=>item.textContent));
        await expect(installationtxt[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

     });

     test('Webinars', async()=>{
     
      await page.waitForSelector(selector.library_maiMenu);
      await page.click(selector.library_maiMenu);
      await page.waitForSelector(selector.webinars);
      await page.click(selector.webinars);
      await page.waitForSelector(selector.libraryLabel);
      var installationtxt =await page.$$eval(selector.libraryLabel, 
        elements=>elements.map(item=>item.textContent));
        await expect(installationtxt[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');


     });

     test('Aviator E-Learning Modules', async()=>{

      await page.waitForSelector(selector.library_maiMenu);
      await page.click(selector.library_maiMenu);
      await page.waitForSelector(selector.AviatorE);
      await page.click(selector.AviatorE);
      await page.waitForSelector(selector.libraryLabel);
      var installationtxt =await page.$$eval(selector.libraryLabel, 
        elements=>elements.map(item=>item.textContent));
        await expect(installationtxt[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');


     });
     
     
 
    });

});