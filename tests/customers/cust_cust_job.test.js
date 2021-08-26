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

    describe('Cust_jobs test', () => {
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

  

      /*test('Billin one-time new customer test',async()=>{   //despues de un nuevo customer

        await page.waitForSelector(selector.select_customer);
        await page.click(selector.select_customer);
        await page.waitForSelector(selector.job_schedulesbtn);
        await page.click(selector.job_schedulesbtn);
        await page.waitForSelector(selector.install_date);
        await page.type(selector.job_schedule_start_date,data.job_schedule_startdate);
        await page.click(selector.finish_customer_setupbtn);
        await page.waitForSelector(selector.flash_notice);
        await page.click(selector.billing_onetimebtn);
        await page.select(selector.job_line_item_id, data.line_item);
        await page.type(selector.job_date, data.job_schedule_startdate);
        await page.type(selector.job_price_in_dollars, data.price_in_dollars);
        await page.waitForSelector(selector.create_jobbtn);
        await page.click(selector.create_jobbtn);
        await page.waitForSelector(selector.flash_notice);
        var successjobtxt=await page.$$eval(selector.flash_notice, 
              elements=>elements.map(item=>item.textContent));
          await expect(successjobtxt[0]).toContain('');

      });*/

   test('Billing one-time test', async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.job_schedulesbtn);
      await page.click(selector.job_schedulesbtn);
      await page.waitForSelector(selector.one_timebtn);
      await page.click(selector.one_timebtn);
      await page.waitForSelector(selector.job_line_item_id);
      await page.select(selector.job_line_item_id,data.line_item);
      await page.waitForSelector(selector.job_date);
      await page.type(selector.job_date, data.job_schedule_startdate);
      await page.waitForSelector(selector.job_price_in_dollars);
      await page.type(selector.job_price_in_dollars, data.price_in_dollars);
      await page.waitForSelector(selector.create_jobbtn);
      await page.click(selector.create_jobbtn);
      await page.waitForSelector(selector.flash_notice);
        var successjobtxt=await page.$$eval(selector.flash_notice, 
            elements=>elements.map(item=>item.textContent));
           await expect(successjobtxt[0]).toContain('');

    });

    test('Billing Recurring test',async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.job_schedulesbtn);
      await page.click(selector.job_schedulesbtn);
      await page.waitForSelector(selector.new_recurring_jobbtn);
      await page.click(selector.new_recurring_jobbtn);
      await page.waitForSelector(selector.job_schedule_start_date);
      await page.type(selector.job_schedule_start_date, data.job_schedule_startdate);
      await page.waitForSelector(selector.job_schedule_frequency);
      await page.select(selector.job_schedule_frequency, data.frequency);
      await page.waitForSelector(selector.job_schedule_price_in_dollars);
      await page.type(selector.job_schedule_price_in_dollars,data.price_in_dollars);
      await page.waitForSelector(selector.Create_Job_Schedulebtn);
      await page.click(selector.Create_Job_Schedulebtn);
      await page.waitForSelector(selector.flash_notice);
        var successjobtxt=await page.$$eval(selector.flash_notice, 
          elements=>elements.map(item=>item.textContent));
         await expect(successjobtxt[0]).toContain('');

    });

 
 
    });
});
