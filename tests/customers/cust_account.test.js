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

    describe('Customer Account test', () => {
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


    test('Robot Never Installed test', async()=>{
        await page.waitForSelector(selector.select_customer);
        await page.click(selector.select_customer);
        await page.waitForSelector(selector.never_installedbtn);
        await page.click(selector.never_installedbtn);
        await page.waitForSelector(selector.flash_notice);
        var neverinstalledtx= await page.$$eval(selector.flash_notice, 
          elements=>elements.map(item=>item.textContent));
          await expect(neverinstalledtx[0]).toContain('');
    
       });


   test('Activate Customer Account test',async()=>{

 
    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
      page.on('dialog', async dialog => {
         await dialog.accept();
       });  
    await page.waitForSelector(selector.open_accountbtn);
    await page.click(selector.open_accountbtn).catch(e => console.log(e));
    await page.waitForSelector(selector.flash_notice);
         var succesopenacounttxt=await page.$$eval(selector.flash_notice, 
          elements=>elements.map(item=>item.textContent));
        await expect(succesopenacounttxt[0]).toContain('');


     });
  
  test ('Update Cutomer Account test', async()=>{ 

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.customer_first_name);
    await page.$eval(selector.customer_first_name, el=>el.value='');//reemplazar un texto por otro
    await page.type(selector.customer_first_name,data.editfirstname);
    await page.waitForSelector(selector.update_customerbtn);
    await page.click(selector.update_customerbtn);
    await page.waitForSelector(selector.flash_notice);
     var succeseditcostomertxt=await page.$$eval(selector.flash_notice,
       elements=>elements.map(item=>item.textContent));
    await expect(succeseditcostomertxt[0]).toContain('');

   });
    

  test ('Change Customer password test', async()=>{
    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.customer_password);
    await page.type(selector.customer_password, data.update_password);
    await page.type(selector.customer_password_confirmation, data.confirm_update_pass);
    await page.click(selector.update_customerbtn);
    await page.waitForSelector(selector.flash_notice);
    var updatepass =await page.$$eval(selector.flash_notice,
      elements=>elements.map(item=>item.textContent));
      await expect(updatepass[0]).toContain('');

    });

 test('Referral Link test', async()=>{

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.mouse.down();
    await page.waitForSelector(selector.referral_link);
    await page.click(selector.referral_link);
    await page.waitForSelector(selector.robin);
     var robintxt =await page.$$eval(selector.robin,
        elements=>elements.map(item=>item.textContent));
    await expect(robintxt[0]).toContain('');

     });


   test('Update Property test', async()=>{

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.customer_address1);
    await page.$eval(selector.customer_address1, e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
      });
    await page.$eval(selector.customer_address1, el=>el.value='');
    await page.type(selector.customer_address1,data.update_address1);
    await page.waitForSelector(selector.update_prpertybtn);
    await page.click(selector.update_prpertybtn);
    await page.waitForSelector(selector.flash_notice);
    var updateproperty= await page.$$eval(selector.flash_notice, 
      elements=>elements.map(item=>item.textContent));
      await expect(updateproperty[0]).toContain('');

  });

 

  test('Post Comment test',async()=>{
    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.acount_noteCustomer); await
     page.$eval(selector.acount_noteCustomer, e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
      });
    await page.type(selector.acount_noteCustomer, data.coment_customer);
    await page.waitForSelector(selector.post_comentbtn);
    await page.click(selector.post_comentbtn);
    await page.waitForSelector(selector.flash_notice);
    var postcomenttxt= await page.$$eval(selector.flash_notice, 
      elements=>elements.map(item=>item.textContent));
      await expect(postcomenttxt[0]).toContain('');

  });


   test ('Close Customer Account test', async()=>{

    await page.click(selector.select_customer);
    await page.waitForSelector(selector.close_accountbtn);
    await page.click(selector.close_accountbtn);
    await page.waitForSelector(selector.consumer_closed_reason);
    await page.$eval(selector.customer_first_name, el=>el.value='');
    await page.type(selector.consumer_closed_reason,data.colsed_reason);
    await page.waitForSelector(selector.closeaccount_modal);
    await page.click(selector.closeaccount_modal);
    await page.waitForSelector(selector.flash_notice);
      var seccescloseacounttxt=await page.$$eval(selector.flash_notice,
        elements=>elements.map(item=>item.textContent));
    await expect(seccescloseacounttxt[0]).toContain('');

    });

    /*test('Update credit card',async()=>{

      await page.click(selector.select_customer);
      await page.waitForSelector(selector.update_credit_cardbtn);
      await page.click(selector.update_credit_cardbtn);
      await page.waitForSelector(selector.update_card_number);
      await page.type(selector.update_card_number, data.card_number);
      await page.type(selector.update_card_number, data.card_number);
      await page.type(selector.date_credit_card, data.date_card);
      await page.type(selector.cvc, data.cvc);
      await page.clik(selector.payBtn);
      
      
    });*/
   
    


  
    

    });
    
});