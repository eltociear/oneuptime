import puppeteer from 'puppeteer';
import utils from '../../test-utils';
import init from '../../test-init';

require('should');

let browser: $TSFixMe, page: $TSFixMe;
// user credentials

const email = utils.generateRandomBusinessEmail();
const password = '1234567890';

const user = {
    email,
    password,
};

describe('Enterprise Project API', () => {
    const operationTimeOut = init.timeout;

    beforeAll(async (done: $TSFixMe) => {
        jest.setTimeout(init.timeout);

        browser = await puppeteer.launch(utils.puppeteerLaunchConfig);
        page = await browser.newPage();
        await page.setUserAgent(utils.agent);
        // Register user
        await init.registerEnterpriseUser(user, page);
        done();
    });

    afterAll(async (done: $TSFixMe) => {
        browser.close();
        done();
    });

    test(
        'Should create new project from dropdown after login for disabled payment',
        async (done: $TSFixMe) => {
            await init.adminLogout(page);
            await init.loginUser(user, page);
            await init.pageWaitForSelector(page, '#selector', { visble: true });
            await init.page$Eval(page, '#create-project', (e: $TSFixMe) =>
                e.click()
            );
            await init.pageWaitForSelector(page, '#name', { visble: true });
            await init.pageWaitForSelector(page, 'input[id=name]', {
                visible: true,
                timeout: init.timeout,
            });

            await init.pageClick(page, 'input[id=name]');
            await page.focus('input[id=name]');

            await init.pageType(
                page,
                'input[id=name]',
                utils.generateRandomString()
            );

            await init.pageClick(page, 'button[type=submit]');

            const localStorageData = await page.evaluate(() => {
                const json = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);

                    json[key] = localStorage.getItem(key);
                }
                return json;
            });

            localStorageData.should.have.property('project');
            done();
        },
        operationTimeOut
    );
});
