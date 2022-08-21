import _ from 'lodash';
import { isObject, decompose } from './tools-for-objects.js';

const compare = (obj1, obj2) => {                                              // переписать (подсказки шага 6)
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (isObject(value1) && isObject(value2)) {                              // переписать (подсказки шага 6)
        return { key, value: compare(value1, value2), status: 'unchanged' };   // вынести children
      }
      return value1 === value2 ? {
        key,
        value: value1,
        status: 'unchanged',
      } : {
        key,
        value1: decompose(value1),                                              // вынести children
        value2: decompose(value2),                                              // вынести children
        status: 'changed',
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return isObject(value2) ? { key, value: decompose(value2), status: 'added' } : { key, value: value2, status: 'added' };               // вынести children
    }
    return isObject(value1) ? { key, value: decompose(value1), status: 'deleted' } : { key, value: value1, status: 'deleted' };             // вынести children
  });

  return result;
};

export default compare;
