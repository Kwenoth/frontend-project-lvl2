import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each`
  a                            | b                            | c                      | expected
  ${'__fixtures__/file1.json'} | ${'__fixtures__/file2.json'} | ${'stylish'}           | ${readFile('stylish-result.txt')}
  ${'__fixtures__/file1.yml'}  | ${'__fixtures__/file2.yaml'} | ${'stylish'}           | ${readFile('stylish-result.txt')}
  ${'__fixtures__/file1.json'} | ${'__fixtures__/file2.yaml'} | ${'plain'}             | ${readFile('plain-result.txt')}
  ${'__fixtures__/file1.json'} | ${'__fixtures__/file2.yaml'} | ${{ format: 'plain' }} | ${readFile('plain-result.txt')}
  ${'__fixtures__/file1.json'} | ${'__fixtures__/file2.yaml'} | ${'json'}              | ${readFile('json-result.txt')}
  ${'__fixtures__/file1.json'} | ${'__fixtures__/file2.yaml'} | ${'someFormat'}        | ${'Error "someformat". Incorrect exit format. Use "json", "plain" or "stylish" only'}
`('testing genDiff($a, $b, $c)', ({
  a, b, c, expected,
}) => {
  expect(genDiff(a, b, c)).toBe(expected);
});
