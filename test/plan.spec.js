const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {plans} = Payjp(config.apikey, config);

describe('Plans Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    plans.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return plans.list().then(() => {
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
      return plans.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return plans.retrieve('id123').then(() => {
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
      return plans.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return plans.delete('id123').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

});
