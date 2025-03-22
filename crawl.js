const { JSDOM } = require('jsdom');

const normaliseUrl = (url) => {
  const urlObj = new URL(url);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }

  return hostPath;
};

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      //relative
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log('Error with relative url is :', error.message);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log('Error with absolute url is :', error.message);
      }
    }
  }

  return urls;
};

const crawlPage = async (currentUrl) => {
  console.log('crawling page');
  try {
    const res = await fetch(currentUrl);

    if (res.status > 399) {
      console.log(
        `Error in fetching with status code ${res.status} on page ${currentUrl}`
      );
      return;
    }

    const contentType = res.headers.get('content-type');

    if (!contentType.includes('text/html')) {
      console.log(
        `non HTML response with contentType ${contentType} on page ${currentUrl}`
      );
      return;
    }
    console.log('response', await res.text());
  } catch (error) {
    console.log(`Error while fetching ${currentUrl} `, error);
  }
};

module.exports = { normaliseUrl, getURLsFromHTML, crawlPage };
