import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import { isObject } from '../src/tools-for-objects.js';

const formatData = (tree, format) => {
  const exitFormat = isObject(format) ? format.format.toLowerCase() : format.toLowerCase();

  switch (exitFormat) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      return `Error "${exitFormat}". Incorrect exit format. Use "json", "plain" or "stylish" only`;
  }
};

export default formatData;
