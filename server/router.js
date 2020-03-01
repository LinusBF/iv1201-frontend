'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');
const {formatApplication} = require('./applicationFormatter');
const {verificationFailed, backendConFailed} = require('./failedResponseHandler');

module.exports = router => {
  /**
   * Submits a new application
   */
  router.post('/submit', (req, res) => {
    console.info('Received a post request to submit applications');
    verifyToken(req.body.token)
      .then(uid => {
        formatApplication(req.body.application, uid)
          .then(application => {
            console.info(JSON.stringify(application, null, 2));
            backendConnection
              .post(`/application`, {data: application})
              .then(status => res.status(200).send(status))
              .catch(err => backendConFailed(err, res));
          })
          .catch(() => console.info('Format application failed'));
      })
      .catch(error => verificationFailed(error, res));
  });

  /**
   * Requests a status of single user
   */
  router.post('/user-status', (req, res) => {
    console.info('Received a request to get user status');
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(token => {
        console.info(token);
        backendConnection
          .post(`/user/${token}/user-status`)
          .then(userStatus => res.status(200).send(userStatus))
          .catch(() => res.status(500).send('Request to BackendConnection Failed'));
      })
      .catch(error => verificationFailed(error, res));
  });

  /**
   * Request to change the status of an Application
   */
  router.post('/update-approval', (req, res) => {
    console.info('Received a request update application status');
    const idToken = req.body.token;
    const applicationId = req.body.applicationId;
    const oldStatus = req.body.oldStatus;
    const newStatus = req.body.newStatus;
    verifyToken(idToken)
      .then(uId => {
        return backendConnection.get(`/user/${uId}/user-status`);
      })
      .then(userStatus => {
        if (userStatus === 'admin') {
          backendConnection
            .post(`/application/${applicationId}/status`, {data: {status: newStatus, oldStatus}})
            .then(() => res.status(200).send('Updated!'))
            .catch(error => {
              if (error.statusCode === 409) {
                res.status(409).send('Transaction failure!');
              } else {
                res.status(500).send('Request to BackendConnection Failed');
              }
            });
        } else {
          res.status(401).send("You can't do that!");
        }
      })
      .catch(error => verificationFailed(error, res));
  });
};
