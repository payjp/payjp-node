import assert from 'power-assert';

import Requestor from '../src/requestor';
import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Tokens Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    Requestor.prototype.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        card: {
          number: 4242424242424242,
          exp_month: 12,
          exp_year: 2035,
        }
      };
      return payjp.tokens.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'tokens');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.tokens.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'tokens/id123');
      });
    });
  });

});
