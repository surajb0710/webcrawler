const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const cheerio = require('cheerio');

const filePath = 'amazon_product.html';

puppeteer.use(StealthPlugin());

const scrapeAmazon = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const $ = cheerio.load(data);

    const bankOffers = [];

    $('.vsx-offers-desktop-lv__item').each((i, el) => {
      const offerText = $(el > 'h1')
        .text()
        .trim();
      bankOffers.push(offerText);
    });

    console.log(bankOffers);

    const product = {
      productTitle: $('#productTitle').text().trim(),
      productPrice: $('.a-price-whole').first().text().trim(),
      rating: $('#acrCustomerReviewText').first().text().trim(),
      avgRating: $('.reviewCountTextLinkedHistogram > span > a > span')
        .first()
        .text()
        .trim(),
    };

    console.log('-----Product----', product);
  });
};

scrapeAmazon(filePath);
