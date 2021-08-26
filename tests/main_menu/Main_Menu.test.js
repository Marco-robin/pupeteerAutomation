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
        browser = await puppeteer.launch({headless : false, ignoreHTTPSErrors: true, args: [ '--ignore-certificate-errors', '--start-maximized'  ] });
        
    });

    afterEach(async () => {
        await page.close()
    });

    afterAll(async () => {
        await browser.close()
    })

    describe('Main Menu', () => {
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
      test('Dashboard test', async()=>{
        
        await page.waitForSelector(selector.Dashboard_mainMenu);
        await page.click(selector.Dashboard_mainMenu);
        await page.waitForSelector(selector.DashboardLabel);
        var DashboardTxt = await page.$$eval(selector.DashboardLabel,
            elements=> elements.map(item=>item.textContent));       
          await expect(DashboardTxt[0]).toBe(' Autopilot Dashboard ');
        await page.waitForSelector(selector.logoutBtn );
        await page.click(selector.logoutBtn);
        await page.waitForSelector(selector.alert);
          var welcomeTxt = await page.$$eval(selector.alert,
              elements=> elements.map(item=>item.textContent));       
          await expect(welcomeTxt[0]).toContain('You have been signed out.');
      
        });

        test('Customers test', async()=>{
          
            await page.waitForSelector(selector.Customers_mainMenu);
            await page.click(selector.Customers_mainMenu);
            await page.waitForSelector(selector.select_customer);
            var custtxt = await page.$$eval(selector.select_customer,
                elements=> elements.map(item=>item.textContent));       
              await expect(custtxt[0]).toContain('');
              await page.waitForSelector(selector.logoutBtn );
              await page.click(selector.logoutBtn);
              await page.waitForSelector(selector.alert);
                var welcomeTxt = await page.$$eval(selector.alert,
                    elements=> elements.map(item=>item.textContent));       
                await expect(welcomeTxt[0]).toContain('You have been signed out.')
            });

        
        test('Jobs test', async()=>{
          
             await page.waitForSelector(selector.job_main_menu);
             await page.click(selector.job_main_menu);
             await page.waitForSelector(selector.JobsLabel);
                var jobttxt = await page.$$eval(selector.JobsLabel,
                  elements=> elements.map(item=>item.textContent));       
             await expect(jobttxt[0]).toContain('');
             await page.waitForSelector(selector.logoutBtn );
              await page.click(selector.logoutBtn);
              await page.waitForSelector(selector.alert);
                var welcomeTxt = await page.$$eval(selector.alert,
                    elements=> elements.map(item=>item.textContent));       
                await expect(welcomeTxt[0]).toContain('You have been signed out.')

  
            });
       
            test('Operators test', async()=>{
              
                await page.waitForSelector(selector.operator);
                await page.click(selector.operator);
                await page.waitForSelector(selector.OperatorsLabel);
                   var jobttxt = await page.$$eval(selector.OperatorsLabel,
                     elements=> elements.map(item=>item.textContent));       
                await expect(jobttxt[0]).toContain('');
                await page.waitForSelector(selector.logoutBtn );
              await page.click(selector.logoutBtn);
              await page.waitForSelector(selector.alert);
                var welcomeTxt = await page.$$eval(selector.alert,
                    elements=> elements.map(item=>item.textContent));       
                await expect(welcomeTxt[0]).toContain('You have been signed out.')
 
               });

               test('Robots test', async()=>{
                
                await page.waitForSelector(selector.robots_mainmenu);
                await page.click(selector.robots_mainmenu);
                await page.waitForSelector(selector.inventory_displayed);
                   var jobttxt = await page.$$eval(selector.inventory_displayed,
                     elements=> elements.map(item=>item.textContent));       
                await expect(jobttxt[0]).toContain('');
                await page.click(selector.logoutBtn);
                await page.waitForSelector(selector.alert);
                  var welcomeTxt = await page.$$eval(selector.alert,
                      elements=> elements.map(item=>item.textContent));       
                  await expect(welcomeTxt[0]).toContain('You have been signed out.')
 
               });

              /* test('reports', async()=>{
                
                await page.waitForSelector(selector.reports_main_menu);
                await page.click(selector.reports_main_menu);
                await page.waitForSelector(selector.reports_dropdown);
                var repodroptxt= await page.$$eval(selector.reports_dropdown,
                    elements=> elements.map(item=>item.textContent));       
                  await expect(repodroptxt[0]).toContain('Customers');
                  await page.click(selector.logoutBtn);
                  await page.waitForSelector(selector.alert);
                    var welcomeTxt = await page.$$eval(selector.alert,
                        elements=> elements.map(item=>item.textContent));       
                    await expect(welcomeTxt[0]).toContain('You have been signed out.')
            
                   }); */ 

                test('Library test', async()=>{
                  
                  
                  await page.waitForSelector(selector.library_maiMenu);
                  await page.click(selector.library_maiMenu);
                  await page.waitForSelector(selector.libraryLabel);
                  var welcomeTxt = await page.$$eval(selector.libraryLabel,
                    elements=> elements.map(item=>item.textContent));       
                  await expect(welcomeTxt[0]).toContain('');
                  await page.click(selector.logoutBtn);
                  await page.waitForSelector(selector.alert);
                    var welcomeTxt = await page.$$eval(selector.alert,
                        elements=> elements.map(item=>item.textContent));       
                    await expect(welcomeTxt[0]).toContain('You have been signed out.')
                  
                });
                
                test('Subscriber Edit test', async()=>{
                  
                  await page.waitForSelector(selector.subscriber_edit);
                  await page.click(selector.subscriber_edit);
                  await page.waitForSelector(selector.subsEdit);
                  var welcomeTxt = await page.$$eval(selector.subsEdit,
                    elements=> elements.map(item=>item.textContent));       
                  await expect(welcomeTxt[0]).toContain('');
                  await page.click(selector.logoutBtn);
                  await page.waitForSelector(selector.alert);
                    var welcomeTxt = await page.$$eval(selector.alert,
                        elements=> elements.map(item=>item.textContent));       
                    await expect(welcomeTxt[0]).toContain('You have been signed out.')
          
                });

            


    });

});