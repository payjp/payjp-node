import assert from 'power-assert';

import Requestor from '../src/requestor';
import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Plans Resource', () => {

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
      return payjp.plans.list().then(() => {
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
      return payjp.plans.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.plans.retrieve('id123').then(() => {
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
      return payjp.plans.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.plans.delete('id123').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'plans/id123');
      });
    });
  });

});
