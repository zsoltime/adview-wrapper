'use strict';

const express = require('express');
const request = require('superagent');

const { removeEmptyProps } = require('./helpers');
const { PORT, PUBLISHER, URL } = require('./config');

const app = express();

app.enable('trust proxy');
app.set('port', PORT);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ORIGIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
});

app.get('/', (req, res) => {
  const defaultSettings = {
    publisher: PUBLISHER,
    user_ip: req.ip,
  };
  const settings = removeEmptyProps(
    Object.assign({}, defaultSettings, req.query)
  );

  request
    .get(URL)
    .query(settings)
    .end((err, apiResponse) => {
      if (err) {
        if (apiResponse && apiResponse.body) {
          return res.json({
            error: apiResponse.body,
          });
        }
        return res.json({
          error: err,
        });
      }
      return res.json(apiResponse.body);
    });
});

module.exports = app;
