import { PlaywrightCrawler } from 'crawlee';
import fs from 'fs';

const crawler = new PlaywrightCrawler({
  headless: true,
  requestHandler: async ({ page, request, log, enqueueLinks }) => {
    log.info(`Scraping: ${request.url}`);

    const data = {};

    // data.productName = await page.textContent('#productTitle');

    // data.rating = await page.textContent(
    //   '#averageCustomerReviews_feature_div span[data-a-popover] a span'
    // );

    // data.numRatings = await page.textContent('#acrCustomerReviewText');

    // data.sellingPrice = await page.textContent('span.a-price span.a-offscreen');

    // data.totalDiscount = await page.textContent('span.savingsPercentage');

    // await page.waitForSelector('p.a-spacing-mini', { timeout: 5000 });

    await page.locator('#itembox-NoCostEmi .offers-items-content').click();

    const elementCount = await page.$('vsx-offers-desktop-lv__item');
    if (elementCount) {
      console.log('Element is present');
    } else {
      console.log('Element is NOT present');
    }

    const exists = await page.evaluate(
      () => !!document.querySelector('p.a-spacing-mini')
    );
    console.log(exists ? 'Element exists' : 'Element does NOT exist');

    const isHidden = await page.locator('p.a-spacing-mini').isHidden();
    console.log(isHidden ? 'Element is hidden' : 'Element is visible');

    // const text = await page
    //   .locator('p.a-spacing-mini')
    //   .textContent({ timeout: 5000, force: true });

    const text = await page.evaluate(() => {
      const element = document.querySelector('p.a-spacing-mini');
      return element ? element.innerHTML.trim() : 'Not found';
    });

    console.log(`Text: ${text}`);

    const bankOffers = await page.$$eval('p.a-spacing-mini', (elements) =>
      elements.map((el) => el.textContent.trim())
    );
    data.bankOffers = bankOffers;

    // const aboutThisItem = await page.$$eval(
    //   '#feature-bullets ul li',
    //   (elements) => elements.map((el) => el.textContent.trim())
    // );
    // data.aboutThisItem = aboutThisItem;

    // const productInfo = await page.$$eval(
    //   '#productDetails_techSpec_section_1 tr',
    //   (rows) =>
    //     rows.map((row) => {
    //       const key = row.querySelector('th')?.textContent?.trim();
    //       const value = row.querySelector('td')?.textContent?.trim();
    //       return { key, value };
    //     })
    // );
    // data.productInfo = productInfo;

    // const productImages = await page.$$eval('#altImages img', (images) =>
    //   images.map((img) => img.src.replace('_SS40_', '_SL1000_'))
    // );
    // data.productImages = productImages;

    // const manufacturerImages = await page.$$eval('#aplus img', (images) =>
    //   images.map((img) => img.src)
    // );
    // data.manufacturerImages = manufacturerImages;

    fs.writeFileSync('amazon_product.json', JSON.stringify(data, null, 2));

    console.log('Scraped Data:', data);
  },
});

await crawler.run([
  'https://www.amazon.in/Voltas-Window-183-Vectra-Pearl/dp/B0BSJ7KZLJ?th=1',
]);
