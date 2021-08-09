const puppeteer = require('puppeteer');
const data = require('../../helpers/dataStaging.json');
const selector = require('../../helpers/selectors.json');
const expect = require('expect');

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

    describe('Login Test', () => {
        beforeEach(async () => {
            page = await browser.newPage();
            await page.goto(data.aviatorUrl);
          });
        test('Login == Without data', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1920, height: 1080});
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.flash_error);
            var welcomeTxt = await page.$$eval(selector.flash_error,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toBe('Invalid username or password.');
        });

        test('Login == Wrong Email and valid Password', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1920, height: 1080});
            await page.type(selector.loginEmailInp, data.userWrongEmail);
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.flash_error);
            var welcomeTxt = await page.$$eval(selector.flash_error,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toBe('Invalid username or password.');
        });

        test('Login == Valid Email and invalid Password', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1920, height: 1080});
            await page.type(selector.loginEmailInp, data.userEmail);
            await page.type(selector.loginPassInp, data.userWrongPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.flash_error);
            var welcomeTxt = await page.$$eval(selector.flash_error,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toBe('Invalid username or password.');
        });

        test('Login == Without Email', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1920, height: 1080});
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.flash_error);
            var welcomeTxt = await page.$$eval(selector.flash_error,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toBe('Invalid username or password.');
        });
        test('Login == Without Password', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1920, height: 1080});
            await page.type(selector.loginEmailInp, data.userEmail);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.flash_error);
            var welcomeTxt = await page.$$eval(selector.flash_error,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toBe('Invalid username or password.');
        });

        test('Login == Correct Login', async () => {
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
            await expect(welcomeTxt[0]).toContain('Welcome back');
            
        
        });
     




    });

});
