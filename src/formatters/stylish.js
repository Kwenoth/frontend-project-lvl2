import _ from 'lodash';

const indentAmount = (level) => {
  const defaultIndentAmount = 2;
  const depthIndent = defaultIndentAmount * level;

  return depthIndent;
};

const stringify = (property, formatter, level, char) => {
  if (_.isPlainObject(property)) {
    const result = Object.entries(property).map(([key, value]) => formatter({ key, value, status: 'unchanged' }, level + 2)).join('\n');
    return `{\n${result}\n${char.repeat(indentAmount(level + 1))}}`;
  }

  return property;
};

const stylish = (tree, level) => {
  const indent = ' ';
  const reps = indentAmount(level);
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  switch (status) {
    case 'root':
      return `{\n${value.map((node) => stylish(node, 1)).join('\n')}\n}`;
    case 'nested':
      return `${indent.repeat(reps)}  ${key}: {\n${value.map((node) => stylish(node, level + 2)).join('\n')}\n${indent.repeat(reps + 2)}}`;
    case 'updated':
      return `${indent.repeat(reps)}- ${key}: ${stringify(value1, stylish, level, indent)}\n${indent.repeat(reps)}+ ${key}: ${stringify(value2, stylish, level, indent)}`;
    case 'removed':
      return `${indent.repeat(reps)}- ${key}: ${stringify(value, stylish, level, indent)}`;
    case 'added':
      return `${indent.repeat(reps)}+ ${key}: ${stringify(value, stylish, level, indent)}`;
    case 'unchanged':
      return `${indent.repeat(reps)}  ${key}: ${stringify(value, stylish, level, indent)}`;
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default stylish;
