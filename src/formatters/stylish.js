import _ from 'lodash';

const decompose = (obj) => {
  const keys = _.keys(obj);
  const result = keys.map((key) => {
    const value = obj[key];
    return _.isPlainObject(value) ? { key, value: decompose(value), status: 'nested' } : { key, value, status: 'unchanged' };
  });

  return result;
};

const getValue = (value, func, depth, char) => {
  if (_.isPlainObject(value)) {
    const result = decompose(value).map((node) => func(node, depth + 2)).join('\n');
    return `{\n${result}\n${char.repeat(depth + 2)}}`;
  }
  return value;
};

const stylish = (tree, depth = 0) => {
  const indent = ' ';
  const reps = depth + 2;
  const {
    key,
    value,
    value1,
    value2,
    status,
  } = tree;

  switch (status) {
    case 'root': {
      const result = value.map((node) => stylish(node, 0));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = value.map((node) => stylish(node, reps + 2));
      return `${indent.repeat(reps)}  ${key}: {\n${result.join('\n')}\n${indent.repeat(reps + 2)}}`;
    }
    case 'updated':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value1, stylish, reps, indent)}\n${indent.repeat(reps)}+ ${key}: ${getValue(value2, stylish, reps, indent)}`;
    case 'removed':
      return `${indent.repeat(reps)}- ${key}: ${getValue(value, stylish, reps, indent)}`;
    case 'added':
      return `${indent.repeat(reps)}+ ${key}: ${getValue(value, stylish, reps, indent)}`;
    case 'unchanged':
      return `${indent.repeat(reps)}  ${key}: ${getValue(value, stylish, reps, indent)}`;
    default:
      throw new Error(`Неверный статус объекта 'diff': 'status: ${status}'`);
  }
};

export default stylish;
