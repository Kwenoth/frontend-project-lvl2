import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import compare from './compare.js';

const getExtension = (filepath) => path.extname(filepath);
const getAbsPath = (filepath) => path.resolve(filepath);
const getContent = (filepath) => fs.readFileSync(filepath, 'utf8');
const getData = (content) => JSON.parse(content);

const genDiff = (filepath1, filepath2) => {
  const file1AbsPath = getAbsPath(filepath1);
  const file2AbsPath = getAbsPath(filepath2);
  const file1Content = getContent(file1AbsPath);
  const file2Content = getContent(file2AbsPath);
  const data1 = getData(file1Content);
  const data2 = getData(file2Content);
  const result = compare(data1, data2);
  
  console.log(result);
};

export default genDiff;
