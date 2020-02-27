'use strict';
const chai = require('chai');
const expect = chai.expect;
const sortApplications = require('../client/components/applications/applicationSort');
const fakeData = require('../client/components/applications/fakeApplicationData');

describe('Sort application', () => {
  it('should sortByProperty received low-to-high', function() {
    return sortApplications('applyDate', fakeData.apps).then(newArray => {
      const length = newArray.length;
      let prevDate = new Date(newArray[0].applyDate);
      for (let i = 1; i < length - 1; i++) {
        let newDate = new Date(newArray[i].applyDate);
        expect(newDate).to.not.be.greaterThan(prevDate);
        prevDate = newDate;
      }
    });
  });
});
