import yaml from 'js-yaml';
import path from 'path';

export const getExtension = (filepath) => path.extname(filepath);

const makeParse = (filepath, fileContent) => {
  const ext = getExtension(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      return 'Extension error';
  }
};

export default makeParse;
