import assert from 'power-assert';

import Requestor from '../built/requestor';
import Payjp from '../built';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Cards Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    payjp.customers.cards.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        number: 4242424242424242,
        exp_month: 12,
        exp_year: 2035,
      };
      return payjp.customers.cards.create('cus_id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/cus_id123/cards');
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.list('cus_id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id123/cards');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.retrieve('cus_id123', 'id456').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        address_state: 'tokyo'
      };
      return payjp.customers.cards.update('cus_id123', 'id456', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.delete('cus_id123', 'id456').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

});
