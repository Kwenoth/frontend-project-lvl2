import _ from 'lodash';

const decompose = (obj) => {
  const keys = Object.keys(obj);
  const result = keys.map((key) => {
    const value = obj[key];
    return _.isPlainObject(value) ? { key, value: decompose(value) } : { key, value };
  });

  return result;
};

export default decompose;
