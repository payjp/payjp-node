const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {tokens} = Payjp(config.apikey, config);

describe('Tokens Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    tokens.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      return tokens.create({}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'tokens');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return tokens.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'tokens/id123');
      });
    });
  });

});
