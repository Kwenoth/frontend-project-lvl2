const makeString = (data) => {
  const result = data.map((node) => {
    const {
      key,
      value,
      value1,
      value2,
      status,
    } = node;

    switch (status) {
      case 'unchanged':
        return `    ${key}: ${value}`;
      case 'changed':
        return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
      case 'deleted':
        return `  - ${key}: ${value}`;
      case 'added':
        return `  + ${key}: ${value}`;
      default:
        return 'Error status';
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default makeString;
