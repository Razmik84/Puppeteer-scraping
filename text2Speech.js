

const fs = require('fs');
const puppeteer = require('puppeteer');

const DEFAULT_TXT = 'Hello there, my name is Puppeteer. Welcome to javascript conference 2018.';

const executablePath = process.env.CHROME_PATH ||
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

(async() => {

    const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    args: [
        '--window-position=0,0',
        '--enable-speech-dispatcher'
    ],
});

const page = await browser.newPage();

page.on('console', async msg => {
    if (msg.text() === 'SPEECH_DONE') {
        await browser.close();
    }
});

const flagIdx = process.argv.findIndex(item => item === '-t');
const text = flagIdx === -1 ? DEFAULT_TXT : process.argv.slice(flagIdx + 1).join(' ');

await page.evaluateOnNewDocument(text => window.TEXT2SPEECH = text, text);

const html = fs.readFileSync('./html/speech_synth.html', {encoding: 'utf-8'});

await page.goto(`data:text/html,${html}`);

const button = await page.$('button');
button.click();

})();