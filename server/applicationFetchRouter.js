'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');
const {verificationFailed, backendConFailed} = require('./failedResponseHandler');

module.exports = router => {
  /**
   * Request a single application
   */
  router.post('/fetch-application', (req, res) => {
    console.info('Received a post request to fetch user tied application');
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(token => {
        backendConnection
          .get(`/user/${token}/application`)
          .then(application => {
            res.status(200).send(application);
          })
          .catch(response => {
            if (response.statusCode === 404) {
              res.status(404).send('No application has been submitted for this user!');
            } else {
              backendConFailed(response, res);
            }
          });
      })
      .catch(error => verificationFailed(error, res));
  });

  /**
   * Request a single application
   */
  router.post('/fetch-application/:applicationId', (req, res) => {
    console.info('Received a post request to fetch one application');
    const applicationId = req.params.applicationId;
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(() => {
        backendConnection
          .get(`/application/${applicationId}`)
          .then(application => {
            res.status(200).send(application);
          })
          .catch(err => backendConFailed(err, res));
      })
      .catch(error => verificationFailed(error, res));
  });

  /**
   * Requests payload of several applications
   */
  router.post('/fetch-applications', (req, res) => {
    console.info('Received a get request to fetch applications');
    const count = req.body.count;
    const offset = req.body.offset;
    verifyToken(req.body.token === '' ? process.env.TEMP_TOKEN : req.body.token).then(() => {
      backendConnection.get(`/application?count=${count}&offset=${offset}`).then(applications => {
        res.status(200).send(applications);
      });
    });
  });
};
