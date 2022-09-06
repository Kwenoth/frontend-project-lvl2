import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: value1, status: 'removed' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const children = makeDiff(value1, value2);
      return { key, value: children, status: 'nested' };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key, value1, value2, status: 'updated',
      };
    }

    return { key, value: value1, status: 'unchanged' };
  });

  return result;
};

const compare = (obj1, obj2) => {
  const result = makeDiff(obj1, obj2);
  return { value: result, status: 'root' };
};

export default compare;
