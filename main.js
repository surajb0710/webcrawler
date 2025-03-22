const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

const main = async () => {
  if (process.argv.length < 3) {
    console.log('Error : No website provided');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Error : Too many arguments');
  } else {
    const baseUrl = process.argv[2];
    console.log('Starting crawl of :', baseUrl);
    const pages = await crawlPage(baseUrl, baseUrl, {});
    printReport(pages);
  }
};

main();

// https:wagslane.dev
