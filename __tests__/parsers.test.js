import makeParse, { getExtension } from '../src/parsers';

test('test extension', () => {
  expect(getExtension('file.js')).toBe('.js');
  expect(getExtension('file.json')).toBe('.json');
  expect(getExtension('file.yml')).toBe('.yml');
  expect(getExtension('directory')).toBe('');
});

test('test incorrect extension', () => {
  expect(makeParse('__fixtures__/json-result.txt', 'fixtures')).toBe('Extension error. Use only .json or .yaml files to compare');
});
