const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {transfers} = Payjp(config.apikey, config);

describe('Transfer Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    transfers.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return transfers.list().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return transfers.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers/id123');
      });
    });
  });

  describe('charges', () => {
    it('Sends the correct request', () => {
      return transfers.charges('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers/id123/charges');
      });
    });
  });

});
