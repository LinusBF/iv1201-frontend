'use strict';
const chai = require('chai');
const expect = chai.expect;
const sortApplications = require('../client/components/applications/applicationSort');
const fakeData = require('../client/components/applications/fakeApplicationData');

describe('Sort application', () => {
  it('should sort received low-to-high', done => {
    sortApplications(1, fakeData.apps).then(newArray => {
      newArray.forEach(elem => console.info(elem.applyDate));
      const length = newArray.length;
      let prevDate = new Date(newArray[0].applyDate);
      for (let i = 1; i < length - 1; i++) {
        let newDate = new Date(newArray[i].applyDate);
        expect(newDate).to.not.be.greaterThan(prevDate);
        prevDate = newDate;
      }
      done();
    });
  });
});
