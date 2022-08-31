import { isObject, decompose } from '../tools-for-objects.js';

const stylish = (tree, reps = 2) => {
  const indent = ' ';
  const getValue = (value) => {
    if (Array.isArray(value)) {
      return stylish({ value }, reps + 4);
    }
    if (isObject(value)) {
      return stylish({ value: decompose(value) }, reps + 4);
    }
    return value;
  };

  const result = tree.value.map((node) => {
    const {
      key,
      value,
      value1,
      value2,
      status,
    } = node;

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

export default stylish;
