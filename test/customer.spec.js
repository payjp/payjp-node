import assert from 'power-assert';

import Requestor from '../built/requestor';
import Payjp from '../built';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Customer Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    Requestor.prototype.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.list().then(() => {
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
      return payjp.customers.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.retrieve('id123').then(() => {
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
      return payjp.customers.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.customers.delete('id123').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'customers/id123');
      });
    });
  });

});
