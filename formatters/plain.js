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

      const prop = (val) => {
        if (Array.isArray(val)) {
          return '[complex value]';
        }
        return typeof val === 'string' ? `'${val}'` : val;
      };

      const adress = `${path}.${key}`;

      switch (status) {
        case 'updated':
          return `Property '${adress.slice(1)}' was updated. From ${prop(value1)} to ${prop(value2)}`;
        case 'removed':
          return `Property '${adress.slice(1)}' was removed`;
        case 'added':
          return `Property '${adress.slice(1)}' was added with value: ${prop(value)}`;
        default:
          if (Array.isArray(value)) {
            return `${iter(value, adress)}`;
          }
          return [];
      }
    });

    return result.join('\n');
  };

  return iter(tree, startPath);
};

export default plain;
