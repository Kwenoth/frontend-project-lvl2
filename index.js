import compare from './src/compare.js';
import makeData from './src/parsers.js';
import formatData from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = makeData(filepath1);
  const data2 = makeData(filepath2);
  const diff = compare(data1, data2);
  const formatedData = formatData(diff, formatName);

  return formatedData;
};

export default genDiff;
