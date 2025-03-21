const { normaliseUrl } = require('./crawl.js');
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
