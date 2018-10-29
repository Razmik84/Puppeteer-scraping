

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://jsconf.am/')
    await page.pdf({ path: './pdf/jsConf.pdf', format: 'A4' })
    await browser.close()
})()