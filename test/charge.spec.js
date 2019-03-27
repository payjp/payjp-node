const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {charges} = Payjp(config.apikey, config);

describe('Charges Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    charges.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return charges.list().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'charges');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 1000,
        currency: 'jpy',
        card: 'tok_test'
      };
      return charges.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return charges.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      return charges.update('id123', {}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('capture', () => {
    it('Sends the correct request', () => {
      return charges.capture('id123', {}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/capture');
      });
    });
  });

  describe('refund', () => {
    it('Sends the correct request', () => {
      return charges.refund('id123', {}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/refund');
      });
    });
  });

});
