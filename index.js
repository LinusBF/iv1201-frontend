'use strict';

const express = require('express');
const app = express();

const backendConnection = require('src/backendConnection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

app.get('/server-side-call', (req, res) => {
  backendConnection
    .post('/', {data: 'this is front end talking'})
    .then(response => {
      console.info(`Received ${response} from backend`);
      res.status(200).send(response);
    })
    .catch(err => {
      console.error(`Request to backend failed with error ${err}`);
      res.status(500).send('Please check the logs!');
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
