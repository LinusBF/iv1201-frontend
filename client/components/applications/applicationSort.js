const _ = require('lodash');

/**
 * @param property String
 * @param array Array
 * @returns {Promise<array>}
 */
const sortApplications = function(property, array) {
  return new Promise(resolve => {
    let updatedArray = array;
    updatedArray.sort((a, b) => {
      let aVal = _.at(a, property);
      let bVal = _.at(b, property);
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    });
    resolve(updatedArray);
  });
};

module.exports = sortApplications;
