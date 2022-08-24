import stylish from './stylish.js';
import plain from './plain.js';
import { isObject } from '../src/tools-for-objects.js';

const formatData = (tree, formatName) => {
  const exitFormat = isObject(formatName) ? formatName.format.toLowerCase() : formatName;

  if (exitFormat === 'stylish') {
    return stylish(tree);
  }
  if (exitFormat === 'plain') {
    return plain(tree);
  }

  return `Error "${exitFormat}". Incorrect exit format. Use only "plain" or "stylish"`;
};

export default formatData;
