const property = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (tree) => {
  const startPath = '';
  const iter = (array, path) => {
    const result = array.flatMap((node) => {
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
          return Array.isArray(value) ? `${iter(value, adress)}` : [];
      }
    });

    return result.join('\n');
  };

  return iter(tree, startPath);
};

export default plain;
