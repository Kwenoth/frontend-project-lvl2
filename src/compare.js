import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return value1 === value2 ? {
        key,
        value: value1,
        status: 'unchanged',
      } : {
        key,
        value1,
        value2,
        status: 'changed',
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, status: 'added' };
    }
    return { key, value: value1, status: 'deleted' };
  });

  return result;
};

export default compare;
