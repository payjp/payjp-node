import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Tokens Resource', () => {

  var _token;

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        card: {
          number: 4242424242424242,
          exp_month: 12, // eslint-disable-line camelcase
          exp_year: 2035, // eslint-disable-line camelcase
        }
      };
      return payjp.tokens.create(query).then((res) => {
        assert.equal(res.object, 'token');
        assert(res.used === false);

        _token = res;
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.tokens.retrieve(_token.id).then((res) => {
        assert.ok(res.id, _token.id);
      });
    });
  });

});
