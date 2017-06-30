module.exports.removeEmptyProps = obj => Object.keys(obj)
  .filter(key => obj[key])
  .reduce((newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }, {});
