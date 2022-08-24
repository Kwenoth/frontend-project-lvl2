import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing comparison of two JSON files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(readFile('stylish-result.txt'));
});

test('testing comparison of two YAML files', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml')).toBe(readFile('stylish-result.txt'));
});

test('testing comparison of two JSON - YAML files using plain formatter', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', 'plain')).toBe(readFile('plain-result.txt'));
});

test('testing start with CLI', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', { format: 'plain' })).toBe(readFile('plain-result.txt'));
});

test('testing wrong exit format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', 'someFormat')).toBe('Error "someFormat". Incorrect exit format. Use only "plain" or "stylish"');
});
