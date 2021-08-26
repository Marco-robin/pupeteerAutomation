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

    describe('Operators test', () => {
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

        /*test('create operator', async()=>{ 

          await page.waitForSelector(selector.operator) 
          await page.click(selector.operator);
          await page.waitForSelector(selector.create_operatorbtn);
          await page.click(selector.create_operatorbtn);
          await page.waitForSelector(selector.provider_company_name);
          await page.type(selector.provider_company_name, data.companyName);
          await page.type(selector.provider_first_name, data.provider_firstname);
          await page.type(selector.provider_last_name, data.provider_lastname);
          await page.type(selector.provider_email, data.email_provider); //cambiar correo!!
          await page.waitForSelector(selector.provider_phone_number);
          await page.type(selector.provider_phone_number, data.provider_phonenumber);
          await page.type(selector.provider_password, data.userPass);
          await page.type(selector.provider_password_confirmation, data.userPass);
          await page.click(selector.providerbtn);
          await page. waitForSelector(selector.flash_notice);
          var succcreatedoptxt= await page.$$eval(selector.flash_notice,
             elements=>elements.map(item=>item.textContent));
          await expect(succcreatedoptxt[0]).toBe('You have successfully created an account for test test1.');
  
       });*/


      test('message all operators',async()=>{

        await page.waitForSelector(selector.operator) 
        await page.click(selector.operator);
        await page.waitForSelector(selector.message_all_operatorsbtn);
        await page.click(selector.message_all_operatorsbtn);
        await page.waitForSelector(selector.subject);
        await page.type(selector.subject, data.coment_job);
        await page.type(selector.body_message, data.coment_customer);
        page.on('dialog', async dialog => {
          await dialog.accept();
        }); 
        await page.waitForSelector(selector.sendbtn_messageop);
        await page.click(selector.sendbtn_messageop);
        await page.waitForSelector(selector.flash_notice);
        var messajealloptx=await page.$$eval(selector.flash_notice, 
         elements=>elements.map(item=>item.textContent));
       await expect(messajealloptx[0]).toBe('Successfully delivered batch message.');
       await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

      });

      test('edit operators account data',async()=>{

        await page.waitForSelector(selector.operator); 
        await page.click(selector.operator);
        await page.waitForSelector(selector.select_operator);
        await page.click(selector.select_operator);
        await page.waitForSelector(selector.provider_first_name);
        await page.$eval(selector.provider_first_name, el=>el.value='');
        await page.type(selector.provider_first_name, data.provider_firstname);
        await page.waitForSelector(selector.update_operatorbtn);
        await page.click(selector.update_operatorbtn);
        await page.waitForSelector(selector.flash_notice);
        var messajealloptx=await page.$$eval(selector.flash_notice, 
         elements=>elements.map(item=>item.textContent));
          await expect(messajealloptx[0]).toContain('You have successfully ');
          await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');

      });

     test ('Change the password on operators account', async()=>{
       
        
        await page.waitForSelector(selector.operator); 
        await page.click(selector.operator);
        await page.waitForSelector(selector.select_operator);
        await page.click(selector.select_operator);
        await page.waitForSelector(selector.provider_password);
        await page.type(selector.provider_password, data.update_password);
        await page.type(selector.provider_password_confirmation, data.confirm_update_pass);
        await page.click(selector.update_operatorbtn);
        await page.waitForSelector(selector.flash_notice);
        var updatepass =await page.$$eval(selector.flash_notice,
          elements=>elements.map(item=>item.textContent));
        await expect(updatepass[0]).toContain('You have successfully ');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('You have been signed out.');
    
        });

       test('view operator jobs',async()=>{

        await page.waitForSelector(selector.operator); 
        await page.click(selector.operator);
        await page.waitForSelector(selector.select_operator);
        await page.click(selector.select_operator);
        await page.waitForSelector(selector.jobs_dropdown);
        await page.click(selector.jobs_dropdown);
        await page.click(selector.all_jobs);
        await page.waitForSelector(selector.table_operatorsJobs);
        var updatepass =await page.$$eval(selector.table_operatorsJobs,
          elements=>elements.map(item=>item.textContent));
        await expect(updatepass[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
             elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('You have been signed out.');
       

       }); 

       test('View robots assiged to an operator',async()=>{

        await page.waitForSelector(selector.operator); 
        await page.click(selector.operator);
        await page.waitForSelector(selector.select_operator);
        await page.click(selector.select_operator);
        await page.waitForSelector(selector.robots_tab);
        await page.click(selector.robots_tab);
        await page.waitForSelector(selector.robots_operators);
        var updatepass =await page.$$eval(selector.robots_operators,
          elements=>elements.map(item=>item.textContent));
        await expect(updatepass[0]).toContain('');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
             var welcomeTxt = await page.$$eval(selector.alert,
                elements=> elements.map(item=>item.textContent));       
        await expect(welcomeTxt[0]).toContain('You have been signed out.');
     

       }); 

       test('view operators rating',async()=>{
 
        await page.waitForSelector(selector.operator); 
        await page.click(selector.operator);
        await page.waitForSelector(selector.select_operator);
        await page.click(selector.select_operator);
        await page.waitForSelector(selector.ratings_operador);
        await page.click(selector.ratings_operador);
        await page.waitForSelector(selector.card_title);
        await page.waitForSelector(selector.card_title);
        var  raitingtx=await page.$$eval(selector.card_title,
          elements=>elements.map(item=>item.textContent));
           await expect(raitingtx[0]).toContain('');
           await page.waitForSelector(selector.logoutBtn );
           await page.click(selector.logoutBtn);
           await page.waitForSelector(selector.alert);
                var welcomeTxt = await page.$$eval(selector.alert,
                   elements=> elements.map(item=>item.textContent));       
           await expect(welcomeTxt[0]).toContain('You have been signed out.');

       });
      
       






    });
});