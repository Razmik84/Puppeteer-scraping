const puppeteer = require('puppeteer');

let scrape = async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://jsconf.am/');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        var res = [];
        const name = Array.from(document.querySelectorAll('.SpeakerCol .Name'));
        const position = Array.from(document.querySelectorAll('.SpeakerCol .Position'));
        const nameArr = name.map(name => name.textContent);
        const positionArr = position.map(position => position.textContent);

        for(let i=0; i<name.length; i++){
            let data = Object.assign({name: nameArr[i], position: positionArr[i]});
            res.push(data);
        }
        return res;
});

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});









