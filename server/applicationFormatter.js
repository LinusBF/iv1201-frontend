'use strict';

const formatApplication = body => {
  return {
    userId: '12314134134134',
    applyDate: Date.toString(),
    approved: false,
    firstName: body.firstName,
    lastName: body.lastName,
    ssn: body.ssn,
    email: body.email,
    expertise: body.expertise,
    available: body.available,
    letter: body.letter,
  };
};

module.exports = {formatApplication};
