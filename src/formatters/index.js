import stylish from './stylish.js';
import plain from './plain.js';

const formatData = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, ' ');
    default:
      return `Error "${format}". Incorrect exit format. Use "json", "plain" or "stylish" only`;
  }
};

export default formatData;
