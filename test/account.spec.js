const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {accounts} = Payjp(config.apikey, config);

describe('Accounts Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    accounts.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return accounts.retrieve().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'accounts');
      });
    });
  });

});
