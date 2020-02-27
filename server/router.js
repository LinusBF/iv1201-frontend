'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');
const {formatApplication} = require('./applicationFormatter');

module.exports = router => {
  /**
   * Request a single application
   */
  router.post('/fetch-application', (req, res) => {
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
          .catch(() => res.status(500).send('Request to BackendConnection Failed'));
      })
      .catch(error => {
        console.info(`Verify token failed: ${error.message}`);
        res.status(400).send(`Verify token failed`);
      });
  });
  /**
   * Requests payload of several applications
   */
  router.get('/fetch-applications', (req, res) => {
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
    verifyToken(req.body.token)
      .then(uid => {
        console.info('Verify token success');
        formatApplication(req.body.application, uid)
          .then(application => {
            console.info('APPLICATION');
            console.info(application);
            backendConnection
              .post(`/application`, application)
              .then(status => {
                res.status(200).send(status);
              })
              .catch(error => {
                console.info(`Post error ${error}`);
              });
          })
          .catch(() => {
            console.info('Format application failed');
          });
      })
      .catch(error => {
        console.info(`Verify token failed: ${error}`);
        res.status(500).send(`Verify token failed:${error}`);
      });
  });
  /**
   * Requests a status of single application
   */
  router.post('/user-status', (req, res) => {
    console.info('Received a request to get user status');
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(token => {
        console.info(`Uid from firebase: ${token}`);
        backendConnection
          .get(`/user/${token.uid}/user-status`)
          .then(userStatus => {
            res.status(200).send(userStatus);
          })
          .catch(() => res.status(500).send('Request to BackendConnection Failed'));
      })
      .catch(error => {
        console.info(`Verify token failed: ${error.message}`);
        res.status(400).send(`Verify token failed`);
      });
  });
};
