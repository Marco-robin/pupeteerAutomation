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
    })

    describe('Select subscriber test', () => {
      beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(data.aviatorUrl);
        await page.waitForSelector(selector.loginEmailInp);
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

      test('Super', async()=>{
        await page.setViewport({width: 1920, height: 1080})
        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.purcharse_orders);
        var welcomeTxt = await page.$$eval(selector.purcharse_orders,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Purchase orders test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.purcharse_orders);
        await page.click(selector.purcharse_orders);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });
      
      test('Subscriber test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.subscriber_super);
        await page.click(selector.subscriber_super);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Robots test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.robotSuper);
        await page.click(selector.robotSuper);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Units test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.units_robot);
        await page.click(selector.units_robot);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Edit Unit test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.units_robot);
        await page.click(selector.units_robot);
        await page.waitForSelector(selector.unitEditbtn);
        await page.click(selector.unitEditbtn);                      //no puse datos para editar
        await page.waitForSelector(selector.updatePartbtn);
        await page.click(selector.updatePartbtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
       
  
      });

      test('Parts test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.parts);
        await page.click(selector.parts);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Weekly billing test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.weeklyBilling);
        await page.click(selector.weeklyBilling);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Transactions test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.transaction);
        await page.click(selector.transaction);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Create transaction test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.transaction);
        await page.click(selector.transaction);
        await page.waitForSelector(selector.createTransactionbtn);
        await page.click(selector.createTransactionbtn);          //no modifique datos
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Delete transaction test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.transaction);
        await page.click(selector.transaction);
        await page.waitForSelector(selector.deleteTransactionbtn);
        await page.click(selector.deleteTransactionbtn);         
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Leads test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.leads_superbtn);
        await page.click(selector.leads_superbtn);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      
      test('Subscriber Leads test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.subcriber_leadsbtn);
        await page.click(selector.subcriber_leadsbtn);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Super Admins test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.super_adminsbtn);
        await page.click(selector.super_adminsbtn);
        await page.waitForSelector(selector.containersuper);
        var welcomeTxt = await page.$$eval(selector.containersuper,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });

      test('Email notifications test', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.EmailNotificationsSuper);
        await page.click(selector.EmailNotificationsSuper);
        await page.waitForSelector(selector.saveEmailbtn);
        await page.click(selector.saveEmailbtn)
        await page.waitForSelector(selector.flash_notice)
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });


      test('View amortization schedule', async()=>{

        await page.waitForSelector(selector.super_mainmenu);
        await page.click(selector.super_mainmenu);
        await page.waitForSelector(selector.robotSuper);
        await page.click(selector.robotSuper);
        await page.waitForSelector(selector.serial_numberRobot);
        await page.click(selector.serial_numberRobot);
        await page.waitForSelector(selector.updateRobotbtn);
        await page.click(selector.updateRobotbtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');
  
      });







   
    });
});