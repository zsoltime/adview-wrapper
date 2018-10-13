'use strict';

const { PORT = 3000, PUBLISHER } = process.env;

module.exports = {
  PORT,
  PUBLISHER,
  URL: 'https://adview.online/api/v1/jobs.json',
  WHITELIST: [
    `http://localhost:${process.env.PORT}`,
    'https://zsolti.co',
    'https://zsolti.me',
  ],
};
