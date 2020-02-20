/**
 * @param type
 * @param array
 * @returns {Promise<array>}
 */
const sortApplications = function(type, array) {
  return new Promise(resolve => {
    let updatedArray = array;
    switch (type) {
      case 1:
        updatedArray = sortOnReceived(array);
        break;
      case 2:
        updatedArray = sortIntOrString(array);
        break;
      default:
        break;
    }
    resolve(updatedArray);
  });
};

function sortOnReceived(array) {
  return array.sort((a, b) => {
    let aD = new Date(a.applyDate);
    let bD = new Date(b.applyDate);
    return aD > bD ? -1 : aD < bD ? 1 : 0;
  });
}

function sortIntOrString(array) {
  return array.sort((a, b) => {
    let aName = a.firstName;
    let bName = b.firstName;
    return aName > bName ? 1 : aName < bName ? -1 : 0;
  });
}

module.exports = sortApplications;
