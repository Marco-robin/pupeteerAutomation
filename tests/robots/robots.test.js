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

    describe('robots test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
        await page.screenshot({ path: data.loginCapture });
        process.on('unhandledRejection', (reason, p) => {
            console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            browser.close();
          });
        await page.setViewport({wwidth: 1920, height: 1080});
        await page.type(selector.loginEmailInp, data.userEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toBe('Welcome back, Automation Test!');
      });

    /*test('inventory', async()=>{
     
      await page.waitForSelector(selector.robots_mainmenu);
      await page.click(selector.robots_mainmenu);
      await page.waitForSelector(selector.inventory_displayed);
      await page.click(selector.inventory_displayed);
      await page.waitForSelector(selector.robot_serial_number);
      await page.click(selector.robot_serial_number);
      await page.waitForSelector(selector.robot_note_note);
      await page.type(selector.robot_note_note, data.coment_customer);
      await page.waitForSelector(selector.robot_notebtn);
      await page.click(selector.robot_notebtn);
      await page.waitForSelector(selector.flash_notice);
        var inventorytxt=await page.$$eval(selector.flash_notice, 
            elements=>elements.map(item=>item.textContent));
          await expect(inventorytxt[0]).toBe('Your comment has been saved.');


    });*/

   /* test('job schedules', async()=>{

      await page.waitForSelector(selector.robots_mainmenu);
      await page.click(selector.robots_mainmenu);
      await page.waitForSelector(selector.robot_job_schedules);
      await page.click(selector.robot_job_schedules);
      await page.waitForSelector(selector.robot_jobschedules_txt);
      var robotjobtxt=await page.$$eval(selector.robot_jobschedules_txt, 
          elements=>elements.map(item=>item.textContent));
        await expect(robotjobtxt[0]).toBe('Robot Job Schedules');


    });*/
    
    test('Example Amortizacion Schedules', async()=>{
     
      await page.waitForSelector(selector.robots_mainmenu);
      await page.click(selector.robots_mainmenu);
      await page.waitForSelector(selector.ExampleA);
      await page.click(selector.ExampleA);
      


    });
      


   
 

    });
});