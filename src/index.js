import path from 'path';
import fs from 'fs';
import compare from './compare.js';
import makeString from './makeString.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);
const getAbsPath = (filepath) => path.resolve(process.cwd(), filepath);       // переписать
const readFile = (filepath) => fs.readFileSync(getAbsPath(filepath), 'utf8');
const makeData = (content) => JSON.parse(content);                             // переписать

const genDiff = (filepath1, filepath2) => {                                   // переписать
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);
  const data1 = makeData(file1Content);
  const data2 = makeData(file2Content);
  const diff = compare(data1, data2);
  const result = makeString(diff);
  return result;
};

export default genDiff;
