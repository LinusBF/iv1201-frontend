'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');

module.exports = router => {
  router.post('/application', (req, res) => {
    console.info('Received a post request to fetch one application');
    const idToken = req.body.userToken;
    verifyToken(idToken)
      .then(token => {
        backendConnection
          .get(`/user/${token.uid}/application`)
          .then(application => {
            res.status(200).send(application);
          })
          .catch(res.status(400).send('Request to BackendConnection Failed'));
      })
      .catch(error => {
        console.info(`Verify token failed: ${error.message}`);
        res.status(400).send(`Verify token failed`);
      });
  });
};
