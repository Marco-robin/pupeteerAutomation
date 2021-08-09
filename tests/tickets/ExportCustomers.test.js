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

    describe('Export Customer Test', () => {
        beforeEach(async () => {
            page = await browser.newPage();
            await page.goto(data.aviatorUrl);
          });




         test('Export Customers Subscriber', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1280, height: 743});
            await page.type(selector.loginEmailInp, data.userEmail);
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.ExportBtn);
            await page.click(selector.ExportBtn);
            await page.waitForSelector(selector.DownloadExp);
            await page.click(selector.DownloadExp);

        
            
        });



         test('Export Customer Super Admin', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1280, height: 743});
            await page.type(selector.loginEmailInp, data.super_adminEmail);
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.ExportBtn);
            await page.click(selector.ExportBtn);
            await page.waitForSelector(selector.DownloadExp);
            await page.click(selector.DownloadExp);

           });

       

           
         test('Export Customer Subscriber Email', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1280, height: 743});
            await page.type(selector.loginEmailInp, data.subscriberEmail);
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.ExportBtn);
            await page.click(selector.ExportBtn);
            await page.waitForSelector(selector.DownloadExp);
            await page.click(selector.DownloadExp);

           });




           test('Export Customer Subscriber Admin Email', async () => {
            await page.waitForSelector(selector.loginEmailInp);
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
                browser.close();
              });
            await page.setViewport({width: 1280, height: 743});
            await page.type(selector.loginEmailInp, data.super_adminEmail);
            await page.type(selector.loginPassInp, data.userPass);
            await page.click(selector.loginBtn);
            await page.waitForSelector(selector.ExportBtn);
            await page.click(selector.ExportBtn);
            await page.waitForSelector(selector.DownloadExp);
            await page.click(selector.DownloadExp);

           });


           



    });

});

   
      


