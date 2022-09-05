import _ from 'lodash';

const property = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (tree, path = '') => {
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  const name = key === undefined ? '' : key;
  const adress = `${path}.${name}`;

  switch (status) {
    case 'root':
    case 'nested': {
      const result = value.flatMap((node) => plain(node, adress));
      return result.join('\n');
    }
    case 'updated':
      return `Property '${adress.slice(2)}' was updated. From ${property(value1)} to ${property(value2)}`;
    case 'removed':
      return `Property '${adress.slice(2)}' was removed`;
    case 'added':
      return `Property '${adress.slice(2)}' was added with value: ${property(value)}`;
    default:
      return [];
  }
};

export default plain;
