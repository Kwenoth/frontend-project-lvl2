import { isObject } from '../tools-for-objects.js';

const property = (value) => {
  if (Array.isArray(value) || isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (tree, path = '') => {
  const result = tree.value.flatMap((node) => {
    const {
      key,
      value,
      value1,
      value2,
      status,
    } = node;

    const adress = `${path}.${key}`;

    switch (status) {
      case 'updated':
        return `Property '${adress.slice(1)}' was updated. From ${property(value1)} to ${property(value2)}`;
      case 'removed':
        return `Property '${adress.slice(1)}' was removed`;
      case 'added':
        return `Property '${adress.slice(1)}' was added with value: ${property(value)}`;
      default:
        return Array.isArray(value) ? `${plain({ value }, adress)}` : [];
    }
  });

  return result.join('\n');
};

export default plain;
