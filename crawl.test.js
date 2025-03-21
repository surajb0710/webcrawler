const { normaliseUrl, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('Normalise Url, strip protocol', () => {
  const input = 'https://pomofocus.io/path';
  const actual = normaliseUrl(input);
  const expected = 'pomofocus.io/path';
  expect(actual).toEqual(expected);
});

test('Normalise Url, Trim trailing slashes', () => {
  const input = 'https://pomofocus.io/path/';
  const actual = normaliseUrl(input);
  const expected = 'pomofocus.io/path';
  expect(actual).toEqual(expected);
});

test('Normalise Url, handle capitals', () => {
  const input = 'https://pomofocus.io/path/';
  const actual = normaliseUrl(input);
  const expected = 'pomofocus.io/path';
  expect(actual).toEqual(expected);
});

test('Normalise Url, Strip http', () => {
  const input = 'http://pomofocus.io/path/';
  const actual = normaliseUrl(input);
  const expected = 'pomofocus.io/path';
  expect(actual).toEqual(expected);
});

test('get url from HTML - absolute', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="http://pomofocus.io/path/">app Link</a>
    </body>
  </html>
  `;

  const inputBaseURL = 'http://pomofocus.io/path/';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['http://pomofocus.io/path/'];
  expect(actual).toEqual(expected);
});

test('get url from HTML - relative', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="/path/">app Link</a>
    </body>
  </html>
  `;

  const inputBaseURL = 'http://pomofocus.io';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['http://pomofocus.io/path/'];
  expect(actual).toEqual(expected);
});

test('get url from HTML - multiple urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="http://pomofocus.io/path1/">app Link</a>
        <a href="/path2/">app Link</a>
    </body>
  </html>
  `;

  const inputBaseURL = 'http://pomofocus.io';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['http://pomofocus.io/path1/', 'http://pomofocus.io/path2/'];
  expect(actual).toEqual(expected);
});

test('get url from HTML - invalid urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="http://pomofocus.io/path1/">app Link</a>
        <a href="/path2/">app Link</a>
        <a href="invalid">app Link</a>
    </body>
  </html>
  `;

  const inputBaseURL = 'http://pomofocus.io';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['http://pomofocus.io/path1/', 'http://pomofocus.io/path2/'];
  expect(actual).toEqual(expected);
});
