import path from 'path';
import fs from 'fs';
import compare from './compare.js';
import makeString from './make-string.js';
import makeParse from './parsers.js';

const getAbsPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsPath(filepath), 'utf8');
const makeData = (filepath, fileContent) => makeParse(filepath, fileContent);

const genDiff = (filepath1, filepath2) => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);
  const data1 = makeData(filepath1, file1Content);
  const data2 = makeData(filepath2, file2Content);
  const diff = compare(data1, data2);
  const result = makeString(diff);

  return result;
};

export default genDiff;
