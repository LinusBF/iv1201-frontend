'use strict';
const chai = require('chai');
const expect = chai.expect;
const admin = require('firebase-admin');
const verifyToken = require('../server/verifyToken');

const projectConfig = {
  projectId: 'global-application-example',
  databaseURL: 'https://global-application-example.firebaseio.com',
};

// eslint-disable-next-line no-unused-vars
const test = require('firebase-functions-test')(projectConfig, 'test/firebase.key.json');

describe('Cloud Functions', () => {
  before(() => {
    admin.initializeApp();
  });

  describe('User verification', () => {
    it('should connect to Firebase + try to verify old idToken', done => {
      const idToken =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNiOGUwZDk3Mjg2MWIwNGJlN2RjNzVhMWIzYmUzYjIyOWIyNWYyMDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2xvYmFsLWFwcGxpY2F0aW9uLWV4YW1wbGUiLCJhdWQiOiJnbG9iYWwtYXBwbGljYXRpb24tZXhhbXBsZSIsImF1dGhfdGltZSI6MTU4MjAyNjMyNCwidXNlcl9pZCI6IlpmZHJKelpFTkxkWnRoQ0hvaGFqMUpybHMxNTMiLCJzdWIiOiJaZmRySnpaRU5MZFp0aENIb2hhajFKcmxzMTUzIiwiaWF0IjoxNTgyMDI2MzI0LCJleHAiOjE1ODIwMjk5MjQsImVtYWlsIjoiZXJpay5sZW5hc0Bob3RtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlcmlrLmxlbmFzQGhvdG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.E6xhJ9WwvmAJgblHzu-TadWG1StkV06BbZPudqAVCr8txGfChBCtnwMK0DOWhbPSKYBR-4eNO8QvWlQOFTXHkJbMJ6csOeDSQBtawTXeRW1dkK181CMEHTu1WEKNyoWEROErf4YNMYFRLJny__04ghoYXLjSHp6pFRlU3HyqOB86gebI4v6yVHFQUSZfY0ot80nyuuS1tqvcbfrhiFq8wfKgg-o9RhjJG6G0y4x1shozwLnrk_Dwrj-JWNy8d4Bs2_R6pTP5I0bPTwbv7zOYnfFAIlGVHlNtjhzyUyuJzi8_34wBpygt4BWPhQt41NDUiTnt0151PGVdoMw8u_6S1Q';
      verifyToken(idToken).catch(error => {
        expect(error.code).to.equal('auth/id-token-expired');
        done();
      });
    });
  });
});
