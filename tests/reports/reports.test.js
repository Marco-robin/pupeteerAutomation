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

    describe('reports test', () => {
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

    /*test('Customers-Active accounts',async()=>{

        await page.waitForSelector(selector.reports_main_menu);
        await page.click(selector.reports_main_menu);
        await page.waitForSelector(selector.customers_active_accounts);
        await page.click(selector.customers_active_accounts);
        await page.waitForSelector(selector.email_reportbtn);
        await page.click(selector.email_reportbtn);
        await page.waitForSelector(selector.alert_succes);
        var emailreporttx = await page.$$eval(selector.alert_succes,
          elements=> elements.map(item=>item.textContent));       
        await expect(emailreporttx[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

      }); */

   /* test('Customers-Closed account', async()=>{

        await page.waitForSelector(selector.reports_main_menu);
        await page.click(selector.reports_main_menu);
        await page.waitForSelector(selector.customers_closed_accounts_report);
        await page.click(selector.customers_closed_accounts_report);
        await page.waitForSelector(selector.closed_acount_reporttx);
        var closeacountreport = await page.$$eval(selector.closed_acount_reporttx,
          elements=> elements.map(item=>item.textContent));       
        await expect(closeacountreport[0]).toBe('Closed Accounts');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');


      });*/ 
    /*test ('Customers-Outside Service Area', async()=>{

      await page.waitForSelector(selector.reports_main_menu);
      await page.click(selector.reports_main_menu);
      await page.waitForSelector(selector.outsidearea);
      await page.click(selector.outsidearea);
      await page.waitForSelector(selector.closed_acount_reporttx);
      var closeacountreport = await page.$$eval(selector.closed_acount_reporttx,
        elements=> elements.map(item=>item.textContent));       
      await expect(closeacountreport[0]).toBe('Customers Outside Service Area');
      await page.waitForSelector(selector.logoutBtn );
      await page.click(selector.logoutBtn);
      await page.waitForSelector(selector.alert);
        var welcomeTxt = await page.$$eval(selector.alert,
            elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('You have been signed out.');
    })*/

   /* test('Customer-Map',async()=>{

        await page.waitForSelector(selector.reports_main_menu);
        await page.click(selector.reports_main_menu);
        await page.waitForSelector(selector.customer_map_report);
        await page.click(selector.customer_map_report);
        await page.waitForSelector(selector.active_customers_map);
        var activecustomersmap= await page.$$eval(selector.active_customers_map,
          elements=> elements.map(item=>item.textContent));       
        await expect(activecustomersmap[0]).toBe('Active Customers');
         await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');



    });  */

    /*test('Install Schedule', async()=>{
    
      await page.waitForSelector(selector.reports_main_menu);
      await page.click(selector.reports_main_menu);
      await page.waitForSelector(selector.install_schedule_report);
      await page.click(selector.install_schedule_report);
      await page.waitForSelector(selector.blocked_date);
      await page.type(selector.blocked_date,data.job_schedule_startdate);
      page.keyboard.press(String.fromCharCode(13));
      await page.waitForSelector(selector.blocked_datebtn);
      page.keyboard.press(String.fromCharCode(13));
     // await page.click(selector.blocked_datebtn);
      await page.waitForSelector(selector.flash_notice);
      var welcomeTxt = await page.$$eval(selector.flash_notice,
        elements=> elements.map(item=>item.textContent));       
      await expect(welcomeTxt[0]).toContain('');
      await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');
    });*/

    test('Leads-Map',async()=>{
 
      await page.waitForSelector(selector.reports_main_menu);
      await page.click(selector.reports_main_menu);
      await page.waitForSelector(selector.customer_leads_map);
      await page.click(selector.customer_leads_map);
      await page.waitForSelector(selector.job_notestx);
      var leadreporttx= await page.$$eval(selector.job_notestx,
          elements=> elements.map(item=>item.textContent));       
        await expect(leadreporttx[0]).toContain('Leads');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

  });

  /*test('Orders',async()=>{
 
    await page.waitForSelector(selector.reports_main_menu);
    await page.click(selector.reports_main_menu);
    await page.waitForSelector(selector.Orders_reports);
    await page.click(selector.Orders_reports);
    await page.waitForSelector(selector.job_notestx);
    var leadreporttx= await page.$$eval(selector.job_notestx,
        elements=> elements.map(item=>item.textContent));       
      await expect(leadreporttx[0]).toContain('BigCommerce Orders');
      await page.waitForSelector(selector.logoutBtn );
      await page.click(selector.logoutBtn);
      await page.waitForSelector(selector.alert);
        var welcomeTxt = await page.$$eval(selector.alert,
            elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('You have been signed out.');

});*/


    test('Robots-Map',async()=>{

        await page.waitForSelector(selector.reports_main_menu);
        await page.click(selector.reports_main_menu);
        await page.waitForSelector(selector.robot_map_report);
        await page.click(selector.robot_map_report);
        await page.waitForSelector(selector.robot_maptx);
        var robotmapreport= await page.$$eval(selector.robot_maptx,
          elements=> elements.map(item=>item.textContent));       
        await expect(robotmapreport[0]).toBe('Active Robot Locations');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');


    });  

    test('weekly billing',async()=>{
 
      await page.waitForSelector(selector.reports_main_menu);
      await page.click(selector.reports_main_menu);
      await page.waitForSelector(selector.weekly_billing);
      await page.click(selector.weekly_billing);
      await page.waitForSelector(selector.weektxt);
      var weeklybilling= await page.$$eval(selector.weektxt,
          elements=> elements.map(item=>item.textContent));       
        await expect(weeklybilling[0]).toBe('Weekly Billing');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');


  });
  /*test('Job Notes', async()=>{

    await page.waitForSelector(selector.reports_main_menu);
    await page.click(selector.reports_main_menu);
    await page.waitForSelector(selector.job_notes_report);
    await page.click(selector.job_notes_report);
    await page.waitForSelector(selector.job_notestx);
    var robotmapreport= await page.$$eval(selector.job_notestx,
        elements=> elements.map(item=>item.textContent));       
      await expect(robotmapreport[0]).toContain('Job Notes');     revisar!
      await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');
    });*/


    /*test('leads', async()=>{
    
      await page.waitForSelector(selector.reports_main_menu);
      await page.click(selector.reports_main_menu);
      await page.waitForSelector(selector.leads_report);
      await page.click(selector.leads_report);
      await page.waitForSelector(selector.job_notestx);
      var leadreporttx= await page.$$eval(selector.job_notestx,
          elements=> elements.map(item=>item.textContent));             revisar!
        await expect(leadreporttx[0]).toBe('Customer Leads');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');
  });*/
  


    
    
    
   








   
   
    });   
    
      

 });
