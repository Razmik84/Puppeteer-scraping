

const puppeteer = require('puppeteer')

try {
    (async () => {
        const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.com')
    await page.type('#twotabsearchtextbox', 'adidas sneakers men')
    await page.click('input.nav-input')
    await page.waitForSelector('#resultsCol')
    await page.waitFor(2000)
    await page.screenshot({path: './screenshots/amazon-adidas-list.png'})
    await page.click('#pagnNextString')
    await page.waitForSelector('#resultsCol')
    await page.waitFor(2000)
    const sneakers = await page.$$('a.a-link-normal.a-text-normal')
    await sneakers[1].click()
    await page.waitForSelector('#ppd')
    await page.screenshot({path: './screenshots/amazon-adidas.png'})
    await browser.close()
    console.log('Done')
})()
} catch (err) {
    console.error(err)
}