'use strict';

const formatApplication = function(body, uid) {
  return new Promise(function(resolve, reject) {
    try {
      resolve({
        data: {
          userId: uid,
          applyDate: body.applyDate,
          approved: null,
          firstName: body.firstName,
          lastName: body.lastName,
          ssn: body.ssn,
          email: body.email,
          expertise: body.expertise,
          available: body.available,
          letter: body.letter,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {formatApplication};
