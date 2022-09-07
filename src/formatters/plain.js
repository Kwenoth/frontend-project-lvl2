import _ from 'lodash';

const getProperty = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree, path = '') => {
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;
  const name = _.isUndefined(key) ? '' : key;
  const adress = `${path}.${name}`;

  switch (status) {
    case 'root':
    case 'nested':
      return value.flatMap((node) => plain(node, adress)).join('\n');
    case 'updated':
      return `Property '${adress.slice(2)}' was updated. From ${getProperty(value1)} to ${getProperty(value2)}`;
    case 'removed':
      return `Property '${adress.slice(2)}' was removed`;
    case 'added':
      return `Property '${adress.slice(2)}' was added with value: ${getProperty(value)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default plain;
