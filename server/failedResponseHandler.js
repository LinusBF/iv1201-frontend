'use strict';
const verificationFailed = (error, res) => {
  console.info(`Verify token failed: ${error.message}`);
  res.status(400).send(`Verify token failed`);
};

const backendConFailed = (error, res) => {
  console.error(error.message);
  res.status(500).send('Request to BackendConnection Failed');
};

module.exports = {
  verificationFailed,
  backendConFailed,
};
