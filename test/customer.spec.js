const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {customers} = Payjp(config.apikey, config);

describe('Customer Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    customers.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
    customers.subscriptions.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return customers.list().then(() => {
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
      return customers.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return customers.retrieve('id123').then(() => {
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
      return customers.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return customers.delete('id123').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('customer\'s subscription list', () => {
    it('Sends the correct request', () => {
      return customers.subscriptions.list('cus_id456').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions');
      });
    });
  });

  describe('customer\'s subscription retrieve', () => {
    it('Sends the correct request', () => {
      return customers.subscriptions.retrieve('cus_id456', 'id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions/id123');
      });
    });
  });
});
