'use strict';
const express = require('express');
const path = require('path');
const app = express();
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const backendConnection = require('./backendConnection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(DIST_DIR));

app.get('/addApplicant', (req, res) => {
  const name = req.query.name;
  const newApplicant = {
    name,
    test: 'other value',
    testBool: true,
  };
  backendConnection
    .post('/addApplicant', {data: newApplicant})
    .then(response => {
      console.info(`Received ${response} from backend`);
      res.status(200).send(response);
    })
    .catch(err => {
      console.error(`Request to backend failed with error ${err}`);
      res.status(500).send('Please check the logs!');
    });
});

app.get('/debug', (req, res) => {
  backendConnection
    .get('/')
    .then(response => {
      console.info(`Received ${response} from backend`);
      res.status(200).send({backend: response, envChecker: `${process.env.NODE_ENV}`});
    })
    .catch(err => {
      console.error(`Request to backend failed with error ${err}`);
      res.status(500).send('Please check the logs!');
    });
});

app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Front end server listening on port', port);
});
