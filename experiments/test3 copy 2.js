const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapeAmazon(productUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );

  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

  // await page.click('.vsx-offers-desktop-lv__item');
  console.log('Log 00000');

  // const offerTitles = await page.evaluate(() => {
  //   return Array.from(
  //     document.querySelectorAll(
  //       'h6.a-size-base.a-spacing-micro.offers-items-title'
  //     )
  //   ).map((el) => el.textContent.trim());
  // });

  // for (const title of offerTitles) {
  //   console.log(`✅ Clicked: ${title}`);

  //   // Close popup if it appears
  //   await page.evaluate(() => {
  //     const closeBtn = document.querySelector('.twister-plus-close-button');
  //     if (closeBtn) closeBtn.click();
  //   });

  //   console.log('✅ Closed popup (if any)');
  // }
  await page.evaluate(() => {
    document
      .querySelectorAll('.vsx-offers-desktop-lv__list')
      .forEach((list) => {
        const heading = list.previousElementSibling
          .querySelector('h2')
          ?.textContent.trim();
        if (heading === 'Bank Offer') {
          console.log('✅ Selected:', heading);
          console.log(list.querySelector('.vsx-offers-desktop-lv__item'));
          console.log(list.querySelector('.vsx-offers-desktop-lv__item > h1'));
          console.log(list.querySelector('.vsx-offers-desktop-lv__item > p'));
        }
      });
  });

  await browser.close();
}

scrapeAmazon(
  'https://www.amazon.in/Voltas-Window-183-Vectra-Pearl/dp/B0BSJ7KZLJ?th=1'
);
