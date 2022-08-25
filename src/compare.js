import _ from 'lodash';
import { isObject, decompose } from './tools-for-objects.js';

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (isObject(value1) && isObject(value2)) {
        const children = compare(value1, value2);
        return { key, value: children, status: 'unchanged' };
      }
      return value1 === value2 ? { key, value: value1, status: 'unchanged' } : {
        key, value1: decompose(value1), value2: decompose(value2), status: 'updated',
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return isObject(value2) ? { key, value: decompose(value2), status: 'added' } : { key, value: value2, status: 'added' };
    }
    return isObject(value1) ? { key, value: decompose(value1), status: 'removed' } : { key, value: value1, status: 'removed' };
  });

  return result;
};

export default compare;
