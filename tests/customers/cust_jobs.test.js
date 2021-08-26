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




  test('Update Job test', async()=>{

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.jobs_dropdown);
    await page.click(selector.jobs_dropdown);
    await page.waitForSelector(selector.all_jobs);
    await page.click(selector.all_jobs);
    await page.waitForSelector(selector.select_job);
    await page.click(selector.select_job);
    await page.waitForSelector(selector.job_state);
    await page.select(selector.job_state, data.state_job);//secleccionar de una lista 
    await page.waitForSelector(selector.loginBtn);
    await page.click(selector.loginBtn);
    await page.waitForSelector(selector.flash_notice);
    var jobstatetxt= await page.$$eval(selector.flash_notice, 
      elements=>elements.map(item=>item.textContent));
     await expect(jobstatetxt[0]).toContain('');



   });

   test('Cancel a Job test', async()=>{

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.jobs_dropdown);
    await page.click(selector.jobs_dropdown);
    await page.waitForSelector(selector.all_jobs);
    await page.click(selector.all_jobs);
    await page.waitForSelector(selector.select_job);   
    await page.click(selector.select_job);
    await page.waitForSelector(selector.cancel_jobbtn);
    await page.click(selector.cancel_jobbtn);
    await page.waitForSelector(selector.flash_notice);
    var jobhistorytxt= await page.$$eval(selector.flash_notice,
     elements=>elements.map(item=>item.textContent));
     await expect(jobhistorytxt[0]).toContain('');

  });

   test('Charge the customer a job', async()=>{

    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.jobs_dropdown);
    await page.click(selector.jobs_dropdown);
    await page.waitForSelector(selector.all_jobs);
    await page.click(selector.all_jobs);                    
    await page.waitForSelector(selector.select_job);
    await page.click(selector.select_job);
    await page.waitForSelector(selector.job_state);
    await page.select(selector.job_state, data.state_job); //hay que cambiar nuevamente el estado para que funcione!!
    await page.waitForSelector(selector.loginBtn);
    await page.click(selector.loginBtn);
    await page.waitForSelector(selector.chargeacustomerBtn);
    await page.click(selector.chargeacustomerBtn);
    await page.waitForSelector(selector.flash_notice);
    var jobstatetxt= await page.$$eval(selector.flash_notice, 
      elements=>elements.map(item=>item.textContent));
     await expect(jobstatetxt[0]).toContain('');


   });

  

  test('Suggested test', async()=>{
    
    await page.waitForSelector(selector.select_customer);
    await page.click(selector.select_customer);
    await page.waitForSelector(selector.jobs_dropdown);
    await page.click(selector.jobs_dropdown);
    await page.waitForSelector(selector.all_jobs);
    await page.click(selector.all_jobs);
    await page.waitForSelector(selector.select_job);
    await page.click(selector.select_job); 
    await page.waitForSelector(selector.suggestedbtn);
    await page.click(selector.suggestedbtn);
    await page.waitForSelector(selector.modal_suggested);
     var suggestedmodtx= await page.$$eval(selector.modal_suggested, 
      elements=>elements.map(item=>item.textContent));
    await expect(suggestedmodtx[0]).toContain('');
    

    });

    test('Add a Comment test', async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.jobs_dropdown);
      await page.click(selector.jobs_dropdown);
      await page.waitForSelector(selector.all_jobs);
      await page.click(selector.all_jobs);
      await page.waitForSelector(selector.select_job);
      await page.click(selector.select_job);
      await page.waitForSelector(selector.job_notes);
      await page.type(selector.job_notes, data.coment_job);
      await page.waitForSelector(selector.job_comentbtn);
      await page.click(selector.job_comentbtn);
      await page.waitForSelector(selector.flash_notice);
       var jobcomenttxt= await page.$$eval(selector.flash_notice, 
        elements=>elements.map(item=>item.textContent));
       await expect(jobcomenttxt[0]).toContain('');
  
     });

     test('Job History test', async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.jobs_dropdown);
      await page.click(selector.jobs_dropdown);
      await page.waitForSelector(selector.all_jobs);
      await page.click(selector.all_jobs);
      await page.waitForSelector(selector.select_job);
      await page.click(selector.select_job);
      await page.waitForSelector(selector.job_history);
      var jobhistorytxt= await page.$$eval(selector.job_history, 
      elements=>elements.map(item=>item.textContent));
      await expect(jobhistorytxt[0]).toContain('');


    });

    test('Update the state of a job test', async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.jobs_dropdown);
      await page.click(selector.jobs_dropdown);
      await page.waitForSelector(selector.all_jobs);
      await page.click(selector.all_jobs);
      await page.waitForSelector(selector.select_job);
      await page.click(selector.select_job);
      await page.waitForSelector(selector.job_state);
      await page.select(selector.job_state, data.stt);//secleccionar de una lista 
      await page.waitForSelector(selector.loginBtn);
      await page.click(selector.loginBtn);
      await page.waitForSelector(selector.flash_notice);
      var jobstatetxt= await page.$$eval(selector.flash_notice, 
        elements=>elements.map(item=>item.textContent));
       await expect(jobstatetxt[0]).toContain('');
  
  
  
     });

     test('Filter jobs test', async()=>{

      await page.waitForSelector(selector.select_customer);
      await page.click(selector.select_customer);
      await page.waitForSelector(selector.jobs_dropdown);
      await page.click(selector.jobs_dropdown);
      await page.waitForSelector(selector.selectjob_option);
      await page.click(selector.selectjob_option);
      await page.waitForSelector(selector.select_job);
      var jobstatetxt= await page.$$eval(selector.select_job, 
        elements=>elements.map(item=>item.textContent));
       await expect(jobstatetxt[0]).toContain('');
  
  
  
     });



 
    
   });

});

