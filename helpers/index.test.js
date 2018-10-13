'use strict';

const { removeEmptyProps } = require('.');

describe('Helpers', () => {
  describe('removeEmptyProps', () => {
    it('removes falsy values from object', () => {
      const obj = {
        array: [],
        emptystring: '',
        falsyBool: false,
        integer: 33,
        nil: null,
        string: 'string',
        truthyBool: true,
        undef: undefined,
      };
      expect(removeEmptyProps(obj)).toMatchObject({
        array: [],
        integer: 33,
        string: 'string',
        truthyBool: true,
      });
    });
  });
});
