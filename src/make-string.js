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
      case 'changed':
        return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
      case 'deleted':
        return `  - ${key}: ${value}`;
      case 'added':
        return `  + ${key}: ${value}`;
      default:
        return `    ${key}: ${value}`;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default makeString;
