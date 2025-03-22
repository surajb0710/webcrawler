const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('Sort Pages, 2 pages', () => {
  const input = {
    'https:wagslane.dev/path': 1,
    'https:wagslane.dev': 3,
  };
  const actual = sortPages(input);
  const expected = [
    ['https:wagslane.dev', 3],
    ['https:wagslane.dev/path', 1],
  ];
  expect(actual).toEqual(expected);
});

test('Sort Pages, multiple pages', () => {
  const input = {
    'https:wagslane.dev/path': 1,
    'https:wagslane.dev': 3,
    'https:wagslane.dev/path1': 2,
    'https:wagslane.dev/path2': 9,
    'https:wagslane.dev/path3': 6,
  };
  const actual = sortPages(input);
  const expected = [
    ['https:wagslane.dev/path2', 9],
    ['https:wagslane.dev/path3', 6],
    ['https:wagslane.dev', 3],
    ['https:wagslane.dev/path1', 2],
    ['https:wagslane.dev/path', 1],
  ];
  expect(actual).toEqual(expected);
});
