const puppeteer = require('puppeteer');

const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
};

module.exports = launchBrowser;