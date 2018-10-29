
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://jsconf.am/')
    await page.screenshot({ path: './screenshots/screenshot.png', fullPage: true })
    await browser.close()
})()