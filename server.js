'use strict';

const app = require('./app');

const server = app.listen(app.get('port'), () =>
  console.log(
    'Server is running on http://localhost:%s',
    server.address().port
  )
);

module.exports = server;
