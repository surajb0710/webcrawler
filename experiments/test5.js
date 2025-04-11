const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Show browser
  const page = await browser.newPage();

  // Set a User-Agent to avoid bot detection
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );

  const productUrl =
    'https://www.amazon.in/kinis-Living-Bedroom-Restaurants-Antique/dp/B0DR2JX8RL/?th=1'; // Replace with any Amazon product URL
  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

  // Wait for the product title to be visible
  await page.waitForSelector('#productTitle', { visible: true });

  // Extract the product title
  // const productTitle = await page.evaluate(() => {
  //   return document.querySelector('#productTitle').textContent.trim();
  // });
  await page.waitForSelector('.offers-items-title', { visible: true });
  await page.evaluate(() => {
    const elementList = document.querySelectorAll('.offers-items-title');

    console.log('------', elementList.entries());

    elementList.forEach((element) => {
      element.click();

      setTimeout(
        document.querySelector('.twister-plus-close-button').click(),
        5000
      );
    });
  });

  const product = {
    productTitle: await page.evaluate(() => {
      return document.querySelector('#productTitle').textContent.trim();
    }),
  };

  console.log('✅ Product Details', product);

  await browser.close();
})();
