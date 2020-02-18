'use strict';
const express = require('express');
const path = require('path');
const firebaseAdmin = require('firebase-admin');
const app = express();
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const moduleRouter = require('./router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(DIST_DIR));

firebaseAdmin.initializeApp();
moduleRouter(app);

app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Front end server listening on port', port);
});
