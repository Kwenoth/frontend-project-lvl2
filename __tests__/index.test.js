import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import { getExtension } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test extension', () => {
  expect(getExtension('file.js')).toBe('.js');
  expect(getExtension('file.json')).toBe('.json');
  expect(getExtension('file.yml')).toBe('.yml');
  expect(getExtension('directory')).toBe('');
});

test('testing comparison of two flat JSON files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(readFile('example.txt'));
});

test('testing comparison of two flat YAML files', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml')).toBe(readFile('example.txt'));
});
