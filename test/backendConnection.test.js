'use strict';
const chai = require('chai');
const expect = chai.expect;
const utils = require('@google-cloud/nodejs-repo-tools');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request-promise-native');

const backendConnection = require('../server/backendConnection');

chai.use(sinonChai);

beforeEach(utils.stubConsole);
afterEach(utils.restoreConsole);

describe('Backend Connection Module', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('should make a request with a authentication token', function() {
    const path = '/hello';
    const options = {data: {test: 'TEST'}};

    const fakeAuthCall = sinon.fake.resolves('TEST_TOKEN');
    const fakePostCall = sinon.fake.returns({
      auth: () => {
        return {data: 'THIS IS A TEST', statusCode: 200};
      },
    });

    sinon.replace(request, 'get', fakeAuthCall);
    sinon.replace(request, 'post', fakePostCall);

    return backendConnection
      .post(path, options)
      .then(response => {
        expect(response.statusCode).to.be.eq(200);
      })
      .catch(err => {
        expect(err).to.be.undefined;
      });
  });
});
