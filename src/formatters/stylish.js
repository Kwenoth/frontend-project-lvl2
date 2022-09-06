import _ from 'lodash';
import decompose from '../decompose.js';

const getValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const result = decompose(value);
    const res = result.map((node) => stylish(node, depth)).join('\n');
    return `{\n    ${res}\n        }`;
  }
  return value;
};

const stylish = (tree, depth = 0) => {
  const indent = ' ';
  const reps = depth + 1;
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  switch (status) {
    case 'root': {
      const result = value.map((node) => stylish(node, reps));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = value.map((node) => stylish(node, reps));
      return `${indent.repeat(reps)}  ${key}: {\n${result.join('\n')}\n${indent.repeat(reps)}}`;
    }
    case 'updated':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value1)}\n${indent.repeat(reps)}+ ${key}: ${getValue(value2)}`;
    case 'removed':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value, reps)}`;
    case 'added':
      return `${indent.repeat(reps)}+ ${key}: ${getValue(value, reps)}`;
    case 'unchanged':
      return `${indent.repeat(reps)}  ${key}: ${getValue(value)}`;
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default stylish;
