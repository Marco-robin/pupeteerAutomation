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

    describe('Customer test', () => {
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

    
       /*test('Create Customer test', async () => {
        await page.click(selector.newcustomerbtn);
        await page.waitForSelector(selector.customertxt);
        var newcustomertxt=await page.$$eval(selector.customertxt,
          elements=>elements.map(item=>item.textContent));
        await expect(newcustomertxt[0]).toBe('New Customer');

       
        await page.type(selector.customer_first_name,data.customerfirstname);
        await page.type(selector.customer_last_name,data.customerlastname);
        await page.type(selector.customer_email,data.customeremail);
        await page.type(selector.customer_phone_number,data.customerphone);
        await page.type(selector.customer_password,data.customerpass);
        await page.type(selector.customer_password_confirmation,data.customerpassconfirmation);
        await page.type(selector.customer_address,data.customeraddress);
        await page.waitForSelector(selector.cratecustomer_btn);
        await page.click(selector.cratecustomer_btn);
        await page.waitForSelector(selector.flash_notice);
         var successtxt=await page.$$eval(selector.flash_notice, 
          elements=>elements.map(item=>item.textContent));
        await expect(successtxt[0]).toContain('');

        
         });*/

     
        test('search cutomers with valid name', async()=>{

          await page.waitForSelector(selector.term);
          await page.type(selector.term, data.valid_namesearch);
          await page.click(selector.searchbtn);
          await page.waitForSelector(selector.select_customer);
           var successtxt=await page.$$eval(selector.select_customer, 
           elements=>elements.map(item=>item.textContent));
           await expect(successtxt[0]).toContain('');

           }); 


        test('Sort Customer list by name', async()=>{
        
          await page.waitForSelector(selector.namesort);
          await page.click(selector.namesort);
          await page.waitForSelector(selector.select_customer);
            var successtxt=await page.$$eval(selector.select_customer, 
            elements=>elements.map(item=>item.textContent));
            await expect(successtxt[0]).toContain('');
        

        });

         test('Sort Customer list by email', async()=>{
        
          await page.waitForSelector(selector.emailsort);
          await page.click(selector.emailsort);
          await page.waitForSelector(selector.em);
            var successtxt=await page.$$eval(selector.em, 
            elements=>elements.map(item=>item.textContent));
            await expect(successtxt[0]).toContain('');
        

        });
        
        
        test('Sort Customer list by date', async()=>{
        
          await page.waitForSelector(selector.createdsort);
          await page.click(selector.createdsort);
          await page.waitForSelector(selector.createdate);
            var successtxt=await page.$$eval(selector.createdate, 
            elements=>elements.map(item=>item.textContent));
            await expect(successtxt[0]).toContain('');
        

        });

        
        test('Sort Customer list by state', async()=>{
        
          await page.waitForSelector(selector.statussort);
          await page.click(selector.statussort);
          await page.waitForSelector(selector.status);
            var successtxt=await page.$$eval(selector.status, 
            elements=>elements.map(item=>item.textContent));
            await expect(successtxt[0]).toContain('');
        

        });

      
        test('Customer address location', async()=>{

         await page.waitForSelector(selector.select_address);
         const pageTarget = page.target(); 
         await page.click(selector.select_address);
         const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); 
         const newPage = await newTarget.page();
         await newPage.waitForSelector(selector.indication_address);
         await newPage.close();

        });
      
      
        test('Login as Customer test',async()=>{
        await page.waitForSelector(selector.select_customer);
        await page.click(selector.select_customer);
         page.on('dialog', async dialog => {     //aceptar las alertas
           await dialog.accept();
         }); 
          await page.waitForSelector(selector.login_asbtn);
          await page.click(selector.login_asbtn);
          await page.waitForSelector(selector.elasticbean);
           var elastictxt=await page.$$eval(selector.elasticbean,
           elements=>elements.map(item=>item.textContent));
          await expect(elastictxt[0]).toContain('');

       });

 
    });
    
});