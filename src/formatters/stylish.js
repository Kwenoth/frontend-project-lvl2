import _ from 'lodash';
import decompose from '../decompose.js';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return decompose(value);
  }
  return value;
};

const stylish = (tree, reps = 2) => {
  const indent = ' ';

  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  switch (status) {
    case 'root': {
      const result = value.flatMap((node) => stylish(node));
      return `{\n${result.join('\n')}\n${indent.repeat(reps - 2)}}`;
    }
    case 'nested': {
      const result = value.map((node) => stylish(node, 4));
      return `${indent.repeat(reps)}  ${key}: ${result}`;
    }
    case 'updated':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value1)}\n${indent.repeat(reps)}+ ${key}: ${getValue(value2)}`;
    case 'removed':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value)}`;
    case 'added':
      return `${indent.repeat(reps)}+ ${key}: ${getValue(value)}`;
    case 'unchanged':
      return `${indent.repeat(reps)}  ${key}: ${getValue(value)}`;
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}, key: ${key}, value: ${value}, type:${_.isPlainObject(tree)}'`);
  }
};

export default stylish;

/* const stylish = (tree, reps = 2) => {
  const indent = ' ';
  const getValue = (value) => {
    if (Array.isArray(value)) {
      return stylish({ value }, reps + 4);
    }
    if (_.isPlainObject(value)) {
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
}; */
