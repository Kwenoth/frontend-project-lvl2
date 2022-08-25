const stylish = (tree) => {
  const iter = (array, reps = 2) => {
    const indent = ' ';
    const result = array.map((node) => {
      const {
        key,
        value,
        value1,
        value2,
        status,
      } = node;

      const getValue = (val) => (Array.isArray(val) ? iter(val, reps + 4) : val);

      switch (status) {
        case 'updated':
          return `${indent.repeat(reps)}- ${key}: ${getValue(value1)}\n${indent.repeat(reps)}+ ${key}: ${getValue(value2)}`;
        case 'removed':
          return `${indent.repeat(reps)}- ${key}: ${getValue(value)}`;
        case 'added':
          return `${indent.repeat(reps)}+ ${key}: ${getValue(value)}`;
        default:
          return `${indent.repeat(reps)}  ${key}: ${getValue(value)}`;
      }
    });

    return `{\n${result.join('\n')}\n${indent.repeat(reps - 2)}}`;
  };

  return iter(tree);
};

export default stylish;
