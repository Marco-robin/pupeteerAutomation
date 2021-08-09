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
        test('Login reset password', async () => {
            await page.waitForSelector(selector.resetPasslink);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1280, height: 743});
            await page.click(selector.resetPasslink);
            await page.waitForSelector(selector.loginEmailInp);
            await page.type(selector.loginEmailInp, data.userWrongEmail);
            await page.click(selector.resetpassBtn);
            await page.waitForSelector(selector.flash_notice);
            var welcomeTxt = await page.$$eval(selector.flash_notice,
                elements=> elements.map(item=>item.textContent));       
            await expect(welcomeTxt[0]).toContain('')
        });

    

    


        


    

   

       





    });
});

