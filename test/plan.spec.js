const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.plans.request = (...args) => Promise.resolve(args);

describe('Plans Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.plans.list().then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'plans');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 1000,
        currency: 'jpy',
        interval: 'month',
        name: 'premium plan'
      };
      return payjp.plans.create(query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.plans.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        name: 'super hyper premium plan'
      };
      return payjp.plans.update('id123', query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.plans.delete('id123').then(([_method, _endpoint]) => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

});
