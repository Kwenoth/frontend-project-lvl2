import _ from 'lodash';

const getProperty = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree, path = []) => {
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  const adress = [...path, key];

  switch (status) {
    case 'root':
      return value.flatMap((node) => plain(node, [])).join('\n');
    case 'nested':
      return value.flatMap((node) => plain(node, adress)).join('\n');
    case 'updated':
      return `Property '${adress.join('.')}' was updated. From ${getProperty(value1)} to ${getProperty(value2)}`;
    case 'removed':
      return `Property '${adress.join('.')}' was removed`;
    case 'added':
      return `Property '${adress.join('.')}' was added with value: ${getProperty(value)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default plain;
