'use strict';

const dotenv = require('dotenv');

dotenv.config();

const headers = require('./headers');
const { WHITELIST } = require('../config');

describe('Middlewares', () => {
  describe('headers', () => {
    it('add CORS to whitelisted origins', () => {
      const origin = WHITELIST[0];
      const req = { headers: { origin } };
      const res = {
        header: jest.fn(),
      };
      const next = jest.fn();

      headers(req, res, next);

      expect(res.header).toBeCalledWith(
        'Access-Control-Allow-Origin',
        origin
      );
      expect(next).toBeCalled();
    });

    it(`doesn't add CORS to non-whitelisted origins`, () => {
      const origin = 'https://notallowed-origin.com';
      const req = { headers: { origin } };
      const res = {
        header: jest.fn(),
      };
      const next = jest.fn();

      headers(req, res, next);

      expect(res.header).not.toBeCalledWith(
        'Access-Control-Allow-Origin',
        origin
      );
      expect(next).toBeCalled();
    });
  });
});
