const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.customers.request = (...args) => Promise.resolve(args);
payjp.customers.subscriptions.request = (...args) => Promise.resolve(args);

describe('Customer Resource', () => {
  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.list().then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        email: 'payjp-node@example.com'
      };
      return payjp.customers.create(query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        email: 'payjp-node-updated@example.com'
      };
      return payjp.customers.update('id123', query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.customers.delete('id123').then(([_method, _endpoint]) => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('customer\'s subscription list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.list('cus_id456').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions');
      });
    });
  });

  describe('customer\'s subscription retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.retrieve('cus_id456', 'id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions/id123');
      });
    });
  });
});
