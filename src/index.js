import compare from './compare.js';
import makeData from './parsers.js';
import formatData from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = makeData(filepath1);
  const data2 = makeData(filepath2);
  const diff = compare(data1, data2);
  const formatedData = formatData(diff, format);

  return formatedData;
};

export default genDiff;
