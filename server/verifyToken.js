'use strict';

var admin = require('firebase-admin');

/**
 * @param idToken
 * @returns {Promise<uid>}
 */
function verifyToken(idToken) {
  return new Promise(function(resolve, reject) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        resolve(decodedToken.uid);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}

module.exports = verifyToken;
