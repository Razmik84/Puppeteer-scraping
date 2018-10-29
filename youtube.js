
const puppeteer = require('puppeteer')

try {
    (async () => {
        const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://youtube.com')
    await page.type('#search', 'guns n roses')
    await page.click('button#search-icon-legacy')
    await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
    await page.waitFor(5000)
    await page.screenshot({path: './screenshots/youtubeList.png'})
    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
    await videos[3].click()
    await page.waitForSelector('.html5-video-container')
    await page.waitFor(5000)
    await page.screenshot({ path: './screenshots/youtubeTrack.png' })
    await browser.close()
    console.log('done')
})()
} catch (err) {
    console.error(err)
}