const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapeAmazon(productUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );

  try {
    await page.goto(productUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : null;
      };

      return {
        title: getText('#productTitle'),
        price:
          getText('#priceblock_ourprice') ||
          getText('#priceblock_dealprice') ||
          getText('.a-price .a-offscreen'),
        reviews: getText('#acrCustomerReviewText'),
      };
    });

    console.log('✅ Scraped Data:', data);
  } catch (error) {
    console.error('❌ Error scraping Amazon:', error.message);
  } finally {
    await browser.close();
  }
}

scrapeAmazon(
  'https://www.amazon.in/Voltas-Window-183-Vectra-Pearl/dp/B0BSJ7KZLJ?th=1'
);
