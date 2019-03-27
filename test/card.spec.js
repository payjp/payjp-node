const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const cards = Payjp(config.apikey, config).customers.cards;

describe('Cards Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    cards.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      return cards.create('cus_id123', {}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/cus_id123/cards');
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return cards.list('cus_id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id123/cards');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return cards.retrieve('cus_id123', 'id456').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      return cards.update('cus_id123', 'id456', {}).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return cards.delete('cus_id123', 'id456').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'customers/cus_id123/cards/id456');
      });
    });
  });

});
