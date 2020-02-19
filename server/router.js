'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');
const formatter = require('./applicationFormatter');

module.exports = router => {
  /**
   * Request a single application
   */
  router.post('/application', (req, res) => {
    console.info('Received a post request to fetch one application');
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(token => {
        console.info(`Uid from firebase: ${token}`);
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
  /**
   * Requests payload of several applications
   */
  router.get('/applications', (req, res) => {
    console.info('Received a get request to fetch applications');
    const count = req.body.count;
    const offset = req.body.offset;
    verifyToken(req.body.token).then(uid => {
      console.info(`Uid from firebase: ${uid}`);
      backendConnection.get(`/application?count=${count}&offset=${offset}`).then(applications => {
        res.status(200).send(applications);
      });
    });
  });
  /**
   * Submits a new application
   */
  router.post('/submit', (req, res) => {
    console.info('Received a post request to submit applications');
    verifyToken(req.body.token).then(uid => {
      const application = formatter.formatApplication(req.body, uid);
      backendConnection.post(`/application`, application).then(applications => {
        res.status(200).send(applications);
      });
    });
  });
  /**
   * Requests a status of single application
   */
  router.post('/status', (req, res) => {
    console.info('Received a post request for status of application');
    backendConnection.post(`/application/${req.body.applicationId}/status`).then(status => {
      res.status(200).send(status);
    });
  });
};
