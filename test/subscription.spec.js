import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Subscription Resource', () => {

  var _customer;
  var _plan1;
  var _plan2;
  var _subscription;

  before((done) => {
    const card_query = {
      number: 4242424242424242,
      exp_month: 12,
      exp_year: 2035,
    };
    const customer_query = {
      email: 'payjp-node@example.com'
    };
    const plan_query_1 = {
      amount: 1000,
      currency: 'jpy',
      interval: 'month',
      name: process.hrtime().join('')
    };
    const plan_query_2 = {
      amount: 2000,
      currency: 'jpy',
      interval: 'month',
      name: process.hrtime().join('')
    };

    Promise.all([
      payjp.customers.create(customer_query).then((res) => {
        assert.equal(res.object, 'customer');
        _customer = res;
      }),
      payjp.plans.create(plan_query_1).then((res) => {
        assert.equal(res.object, 'plan');
        _plan1 = res;
      }),
      payjp.plans.create(plan_query_2).then((res) => {
        assert.equal(res.object, 'plan');
        _plan2 = res;
      })
    ])
    .then(() => {
      payjp.customers.cards.create(_customer.id, card_query).then((res) => {
        assert.equal(res.object, 'card');
      }).then(() => {
        done();
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.list().then((res) => {
        assert.equal(res.object, 'list');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        customer: _customer.id,
        plan: _plan1.id
      };
      return payjp.subscriptions.create(query).then((res) => {
        assert.equal(res.object, 'subscription');
        assert.equal(res.plan.id, _plan1.id);
        _subscription = res;
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        plan: _plan2.id
      };
      return payjp.subscriptions.update(_subscription.id, query).then((res) => {
        assert.equal(res.object, 'subscription');
        assert.equal(res.plan.id, _plan2.id);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.retrieve(_subscription.id).then((res) => {
        assert.equal(res.id, _subscription.id);
      });
    });
  });

  describe('pause', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.pause(_subscription.id).then((res) => {
        assert.equal(res.status, 'paused');
      });
    });
  });

  describe('resume', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.resume(_subscription.id).then((res) => {
        assert.equal(res.status, 'active');
      });
    });
  });

  describe('cancel', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.cancel(_subscription.id).then((res) => {
        assert.equal(res.status, 'canceled');
      });
    });
  });

  describe('customer\'s subscription list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.list(_customer.id).then((res) => {
        assert(res.object === 'list');
        assert(res.count === 1);
      });
    });
  });

  describe('customer\'s subscription retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.retrieve(_customer.id, _subscription.id).then((res) => {
        assert(res.object === 'subscription');
        assert(res.id === _subscription.id);
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.delete(_subscription.id).then((res) => {
        assert.equal(res.id, _subscription.id);
        assert(res.deleted);
      });
    });
  });

});
