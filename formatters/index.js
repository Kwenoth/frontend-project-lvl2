import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import { isObject } from '../src/tools-for-objects.js';

const formatData = (tree, formatName) => {
  const exitFormat = isObject(formatName) ? formatName.format.toLowerCase() : formatName.toLowerCase();

  if (exitFormat === 'stylish') {
    return stylish(tree);
  }
  if (exitFormat === 'plain') {
    return plain(tree);
  }
  if (exitFormat === 'json') {
    return json(tree);
  }

  return `Error "${exitFormat}". Incorrect exit format. Use "json", "plain" or "stylish" only`;
};

export default formatData;
