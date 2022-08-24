import { getExtension } from '../src/parsers.js';

test('test extension', () => {
  expect(getExtension('file.js')).toBe('.js');
  expect(getExtension('file.json')).toBe('.json');
  expect(getExtension('file.yml')).toBe('.yml');
  expect(getExtension('directory')).toBe('');
});
