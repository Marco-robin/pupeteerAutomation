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
        browser = await puppeteer.launch({headless : false, ignoreHTTPSErrors: true, args: [ '--ignore-certificate-errors',  '--start-maximized' ]});
    });

    afterEach(async () => {
        await page.close()
    });

    afterAll(async () => {
        await browser.close()
    })

    describe('subscriber esdit Test', () => {
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
        await page.type(selector.loginEmailInp, data.super_adminEmail);
        await page.type(selector.loginPassInp, data.userPass);
        await page.click(selector.loginBtn);
        await page.waitForSelector(selector.flash_notice);
        var welcomeTxt = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('Welcome back,');
      });

      test('subscriber list test', async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_container);
        var welcomeTxt = await page.$$eval(selector.subscriber_container,
          elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('');

      });

      test('search subscriber', async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.term);
        await page.type(selector.term, data.subscriber_search);
        await page.waitForSelector(selector.searchsubscriber);          
        await page.click(selector.searchsubscriber);
        await page.waitForSelector(selector.sub);
        var subaccount = await page.$$eval(selector.sub,
          elements=> elements.map(item=>item.textContent));       
        await expect(subaccount[0]).toContain('');



      });

     test('Account test', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.customertxt);
        var subaccount = await page.$$eval(selector.customertxt,
          elements=> elements.map(item=>item.textContent));       
        await expect(subaccount[0]).toContain('');



      });

      /*test('Zip Codes test',async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.subzip_codesbtn);
        await page.click(selector.subzip_codesbtn);
        await page.waitForSelector(selector.updatesub_zipbtn);
        await page.click(selector.updatesub_zipbtn);
        await page.waitForSelector(selector.flash_notice);
        var updateziptx = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(updateziptx[0]).toContain('');

      });*/

     test('Banking test',async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.bankingbtn);
        await page.click(selector.bankingbtn);
        await page.waitForSelector(selector.banking_notice);
        var bankingtxt = await page.$$eval(selector.banking_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(bankingtxt[0]).toContain('');

      });

      test('Plan Pricig test',async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.plan_pricingbtn);
        await page.click(selector.plan_pricingbtn);
        await page.waitForSelector(selector.customertxt);
        var plantx = await page.$$eval(selector.customertxt,
          elements=> elements.map(item=>item.textContent));       
        await expect(plantx[0]).toContain('');

      });

      test('Admins test',async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.adminsbtn);
        await page.click(selector.adminsbtn);
        await page.waitForSelector(selector.customertxt);
        var admintx = await page.$$eval(selector.customertxt,
          elements=> elements.map(item=>item.textContent));       
        await expect(admintx[0]).toContain('');

      });

      /*test('Create a new subscriber admin test',async()=>{
       
        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.adminsbtn);
        await page.click(selector.adminsbtn);
        await page.waitForSelector(selector.new_adminbtn);
        await page.click(selector.new_adminbtn);
        await page.waitForSelector(selector.first_nameadmin);
        await page.type(selector.first_nameadmin, data.customerfirstname);
        await page.type(selector.last_nameadmin, data.customerlastname);
        await page.type(selector.email_admin, data.customeremail);
        await page.type(selector.phone_numberadmin, data.search_valid_phone);
        await page.waitForSelector(selector.add_adminbtn);
        await page.click(selector.add_adminbtn);
        await page.waitForSelector(selector.flash_notice);
        var addadmintx = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(addadmintx[0]).toContain('');

      });*/

      

     test('Financing test', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.finiancingbtn);
        await page.click(selector.finiancingbtn);
        await page.waitForSelector(selector.customertxt);
        var resetinvtx = await page.$$eval(selector.customertxt,
          elements=> elements.map(item=>item.textContent));       
        await expect(resetinvtx[0]).toContain('');

       });

     /* test('Email notifications test', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.email_notificationsbtn);
        await page.click(selector.email_notificationsbtn);
        await page.waitForSelector(selector.saveemailBtn)
        await page.click(selector.saveemailBtn);
        await page.waitForSelector(selector.flash_notice);
        var emailtx = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(emailtx[0]).toContain('');
        

      }); */

    /* test('White label enabled test', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.checkWhitelabel);
        await page.click(selector.checkWhitelabel);
        await page.waitForSelector(selector.updateSubscriberBtn);
        await page.click(selector.updateSubscriberBtn);
        await page.waitForSelector(selector.flash_notice);
        var check = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(check[0]).toContain('');

      });*/

     /*test('Activate / Desactivate subscriber test', async()=>{

        await page.waitForSelector(selector.subscriber_edit);
        await page.click(selector.subscriber_edit);
        await page.waitForSelector(selector.subscriber_select);
        await page.click(selector.subscriber_select);
        await page.waitForSelector(selector.subscriber_is_activecheck);
        await page.click(selector.subscriber_is_activecheck);
        await page.waitForSelector(selector.updateSubscriberBtn);
        await page.click(selector.updateSubscriberBtn);
        await page.waitForSelector(selector.flash_notice);
        var check = await page.$$eval(selector.flash_notice,
          elements=> elements.map(item=>item.textContent));       
        await expect(check[0]).toContain('');

      });  */



    });
});