import genDiff, { readFile } from '../src/index.js';

test('testing gendiff', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('__fixtures__/example.txt'));
});