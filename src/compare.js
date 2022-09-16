import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = makeDiff(obj1[key], obj2[key]);
      return { key, value: children, status: 'nested' };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, value: obj1[key], newValue: obj2[key], status: 'updated',
      };
    }

    return { key, value: obj1[key], status: 'unchanged' };
  });
};

const compare = (data1, data2) => {
  const result = makeDiff(data1, data2);
  return { value: result, status: 'root' };
};

export default compare;
