import { chromium, devices } from 'playwright';

const credentials = {
	email: 'hojedax194@covbase.com',
	password: 'TestPassword123',
};

const meetingUrl =
	'https://us04web.zoom.us/j/75984463677?pwd=3mtVabUpPOMMTRm2be5t2NqdMPFpqu.1';
const browser = await chromium.launch();
const context = await browser.newContext(devices['Desktop Chrome']);

//TODO: rewrite auth with https post

const page = await context.newPage();

await page.goto('https://zoom.us/signin#/login');

const emailInput = page.getByLabel('Email Address');
const passwordInput = page.getByLabel('Password');

await emailInput.fill(credentials.email);
await passwordInput.fill(credentials.password);

await page.locator('#js_btn_login').click();

await page.waitForFunction(() => document.readyState === 'complete');

await page.goto(meetingUrl, { waitUntil: 'domcontentloaded' });

await page.locator('.mbTuDeF1').waitFor({
	state: 'attached',
});

await page.locator('.mbTuDeF1').click();

console.log(await page.getByText('Join from Your Browser').textContent());

await page.getByText('Join from Your Browser').waitFor({
	state: 'attached',
});

await page.getByText('Join from Your Browser').click();
await page.waitForFunction(() => document.readyState === 'complete');

await page.locator('#inputname').fill('Test2222');
await page.locator('#joinBtn').click();

await page.locator('#wc_agree1').waitFor({
	state: 'attached',
});
page.locator('#wc_agree1').click();

await new Promise((res, rej) => setTimeout(() => res(''), 20000));

await context.close();
await browser.close();
