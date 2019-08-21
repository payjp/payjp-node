const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.charges.request = (...args) => Promise.resolve(args);

describe('Charges Resource', () => {
  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.charges.list().then(([_method, _endpoint]) => {
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
      return payjp.charges.create(query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.charges.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      return payjp.charges.update('id123', {}).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('capture', () => {
    it('Sends the correct request', () => {
      return payjp.charges.capture('id123', {}).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/capture');
      });
    });
  });

  describe('refund', () => {
    it('Sends the correct request', () => {
      return payjp.charges.refund('id123', {}).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/refund');
      });
    });
  });

});
