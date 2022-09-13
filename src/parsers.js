import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getAbsPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsPath(filepath), 'utf8');

export const getExtension = (filepath) => path.extname(filepath);

const makeData = (filepath) => {
  const extension = getExtension(filepath);
  const fileContent = readFile(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    case '.yaml':
      return yaml.load(fileContent);
    default:
      return 'Extension error. Use only .json or .yaml files to compare';
  }
};

export default makeData;
