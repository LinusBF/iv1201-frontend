function sortApplications(array) {
  return array.sort((a, b) => {
    let aD = new Date(a.applyDate);
    let bD = new Date(b.applyDate);
    return aD > bD ? -1 : aD < bD ? 1 : 0;
  });
}

module.exports = sortApplications;
