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

    describe('jobs test', () => {
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
        await expect(welcomeTxt[0]).toContain('Welcome back,');
      });

     test('jobs',async()=>{

        await page.waitForSelector(selector.job_main_menu);
        await page.click(selector.job_main_menu);
        await page.waitForSelector(selector.range);
        await page.select(selector.range, data.date_range);
        await page.waitForSelector(selector.line_item_id);
        await page.select(selector.line_item_id, data.line_item);
        await page.waitForSelector(selector.update_jobs);
        await page.click(selector.update_jobs);
        await page.waitForSelector(selector.choseMessagelabel);
        var chosetx = await page.$$eval(selector.choseMessagelabel,
          elements=> elements.map(item=>item.textContent));       
        await expect(chosetx[0]).toContain('');


      });

      /*test('message', async()=>{

        await page.waitForSelector(selector.job_main_menu);
        await page.click(selector.job_main_menu);
        page.on('dialog', async dialog => {
            await dialog.accept();
          }); 
        await page.waitForSelector(selector.job_ids_);
        await page.click(selector.job_ids_); 
        await page.waitForSelector(selector.choose_message);
        await page.select(selector.choose_message, data.message);
        await page.waitForSelector(selector.send_messagebtn);
        await page.click(selector.send_messagebtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
      });*/

      
    
  });


});
