'use strict';

const { WHITELIST } = require('../config');

module.exports = (req, res, next) => {
  if (WHITELIST.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
};
