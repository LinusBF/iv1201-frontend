'use strict';
const backendConnection = require('./backendConnection');
const verifyToken = require('./verifyToken');
const {formatApplication} = require('./applicationFormatter');

const verificationFailed = (error, res) => {
  console.info(`Verify token failed: ${error.message}`);
  res.status(400).send(`Verify token failed`);
};

const backendConFailed = (error, res) => {
  console.error(error.message);
  res.status(500).send('Request to BackendConnection Failed');
};

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
          .get(`/user/${token.uid}/application`)
          .then(application => {
            console.log(application);
            res.status(200).send(application);
          })
          .catch(response => {
            if (response.status === 404) {
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
   * Requests a status of single application
   */
  router.post('/user-status', (req, res) => {
    console.info('Received a request to get user status');
    const idToken = req.body.token;
    verifyToken(idToken)
      .then(token => {
        backendConnection
          .get(`/user/${token}/user-status`)
          .then(userStatus => res.status(200).send(userStatus))
          .catch(() => res.status(500).send('Request to BackendConnection Failed'));
      })
      .catch(error => verificationFailed(error, res));
  });
};
