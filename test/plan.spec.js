import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Plans Resource', () => {

  var _plan;

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.plans.list().then((res) => {
        assert(res.count > 0);
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
      return payjp.plans.create(query).then((res) => {
        assert.equal(res.object, 'plan');
        assert.equal(res.amount, query.amount);
        assert.equal(res.name, query.name);

        _plan = res;
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.plans.retrieve(_plan.id).then((res) => {
        assert.ok(res.id, _plan.id);
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        name: 'super hyper premium plan'
      };
      return payjp.plans.update(_plan.id, query).then((res) => {
        assert.equal(res.name, query.name);
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.plans.delete(_plan.id).then((res) => {
        assert.ok(res.deleted);
        assert.equal(res.id, _plan.id);
      });
    });
  });

});
