export const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

export const decompose = (obj) => {
  const keys = Object.keys(obj);
  const result = keys.map((key) => {
    const value = obj[key];
    return isObject(value) ? { key, value: decompose(value) } : { key, value };
  });

  return result;
};
