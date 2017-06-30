const express = require('express');
const request = require('superagent');
const validator = require('validator');
const { removeEmptyProps } = require('./helpers');

const app = express();
const port = process.env.PORT || 3000;

const URL = 'https://adview.online/api/v1/jobs.json';
const PUBLISHER = 340;
const ORIGIN = 'http://localhost:3002';

app.enable('trust proxy');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ORIGIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  const {
    keyword,
    location,
    radius,
    limit,
    page,
    sort,
    job_type,
    max_age,
    salary_from,
    salary_to,
  } = req.query;

  const settings = {
    publisher: PUBLISHER,
    user_ip: req.ip,
    keyword,
    location,
    radius, // 0 - 50
    limit, // 0 - 50
    page, // 1
    sort, // can be date or relevance
    job_type, // temporary, contract, placement student, seasonal
    max_age,
    salary_from,
    salary_to,
  };

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

app.listen(port, () => console.log('Server is listening on port %s', port));
