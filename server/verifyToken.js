'use strict';

var admin = require('firebase-admin');

/**
 * @param idToken
 * @returns {Promise<unknown>}
 */
function verifyToken(idToken) {
  return new Promise(function(resolve) {
    admin.initializeApp();
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        resolve(decodedToken.uid);
      })
      .catch(reason => {
        resolve(reason);
      });
  });
}

module.exports = verifyToken;
