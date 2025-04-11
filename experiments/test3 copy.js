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

  // await page.waitForSelector('#NoCostEmi', {
  //   visible: true,
  //   timeout: 5000,
  // });

  const hiddenValues = await page.evaluate(() => {
    // const hiddenElements = document.querySelectorAll('.a-truncate-cut');

    // const extractedValues = Array.from(hiddenElements).map((span) =>
    //   span.getHTML()
    // );

    const hiddenItem = document.getElementById('itembox-NoCostEmi');

    hiddenItem.click();

    const hiddenElements = document.querySelectorAll('p.a-spacing-mini');

    const extractedValues = Array.from(hiddenElements).map((p) => p.getHTML());

    // return hiddenElements;

    return extractedValues;
  });

  const elementExists =
    (await page.$('div.vsx-offers-desktop-lv__item')) !== null;

  console.log('✅ Element exists:', elementExists);

  console.log('hiddenValues', hiddenValues);

  // await page.click('#itembox-NoCostEmi');

  // await page.waitForSelector('.vsx-offers-desktop-lv__item', {
  //   visible: true,
  //   timeout: 5000,
  // });

  const element = await page.$('#NoCostEmi .vsx-offers-desktop-lv__list');

  if (element) {
    console.log('✅ Element exists!');
  } else {
    console.log('❌ Element NOT found!');
  }

  await page.click('.vsx-offers-desktop-lv__item');

  const product = await page.evaluate(() => {
    console.log('Log 00');

    const getText = (selector) =>
      document.querySelector(selector)?.innerText.trim() || 'N/A';
    const getAttr = (selector, attr) =>
      document.querySelector(selector)?.getAttribute(attr) || 'N/A';

    return document
      .querySelectorAll('h6.a-size-base.a-spacing-micro.offers-items-title')
      .forEach((el) => {
        el.click();
        console.log('-----Title----', el.text().trim());
        console.log(
          '-----desc----',
          $(el + ' > p')
            .text()
            .trim()
        );

        document.querySelector('.twister-plus-close-button').click();
      });

    return {
      // title: getText('#productTitle'),
      // price: getText('.a-price-whole') + (getText('.a-price-fraction') || ''),
      // rating: getText(
      //   `#averageCustomerReviews_feature_div span[data-a-popover] a span`
      // ),
      // totalReviews: getText('#acrCustomerReviewText'),
      // totalDiscount: getText('.savingsPercentage'),
      // bankOffers: {
      //   noCostEMI: Array.from(
      //     document.querySelectorAll('.vsx-offers-desktop-lv__item p')
      //   )
      //     .map((p) => p.textContent.trim())
      //     .filter((text) => text.length > 0),
      // },
      // aboutThisItem: Array.from(
      //   document.querySelectorAll('#feature-bullets li')
      // )
      //   .map((li) => li.innerText.trim())
      //   .filter((text) => text.length > 0),
      // productInformation: getText(''),
      // amazonProductImages: getText(''),
      // amazonProductImages: getText(''),
      // imagesFromManufacturersImages: getText(''),
      // aigeneratedCustomerSummery: getText(''),
    };
  });

  console.log(product);

  await browser.close();
}

scrapeAmazon(
  'https://www.amazon.in/Voltas-Window-183-Vectra-Pearl/dp/B0BSJ7KZLJ?th=1'
);
