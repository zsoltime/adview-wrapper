'use strict';

const express = require('express');
const request = require('superagent');

const headers = require('./middlewares/headers');
const { removeEmptyProps } = require('./helpers');
const { PORT, PUBLISHER, URL } = require('./config');

const app = express();

app.enable('trust proxy');
app.set('port', PORT);
app.use(headers);

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
