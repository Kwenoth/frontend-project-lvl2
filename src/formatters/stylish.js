import _ from 'lodash';

const indentAmount = (level) => {
  const indent = ' ';
  const defaultIndentAmount = 4;
  const depthIndent = defaultIndentAmount * level - 2;

  return indent.repeat(depthIndent);
};

const stringify = (property, formatter, level) => {
  if (_.isPlainObject(property)) {
    const result = Object.entries(property).map(([key, value]) => formatter({ key, value, status: 'unchanged' }, level + 1)).join('\n');
    return `{\n${result}\n${indentAmount(level)}  }`;
  }

  return property;
};

const stylish = (tree, level) => {
  const {
    key,
    value,
    newValue,
    status,
  } = tree;

  switch (status) {
    case 'root':
      return `{\n${value.map((node) => stylish(node, 1)).join('\n')}\n}`;
    case 'nested':
      return `${indentAmount(level)}  ${key}: {\n${value.map((node) => stylish(node, level + 1)).join('\n')}\n${indentAmount(level)}  }`;
    case 'updated':
      return `${indentAmount(level)}- ${key}: ${stringify(value, stylish, level)}\n${indentAmount(level)}+ ${key}: ${stringify(newValue, stylish, level)}`;
    case 'removed':
      return `${indentAmount(level)}- ${key}: ${stringify(value, stylish, level)}`;
    case 'added':
      return `${indentAmount(level)}+ ${key}: ${stringify(value, stylish, level)}`;
    case 'unchanged':
      return `${indentAmount(level)}  ${key}: ${stringify(value, stylish, level)}`;
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default stylish;
