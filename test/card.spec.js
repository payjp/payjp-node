import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

describe('Cards Resource', () => {

  var _customer;
  var _card;

  before((done) => {
    const query = {
      email: 'payjp-node@example.com'
    };
    payjp.customers.create(query).then((res) => {
      assert.equal(res.object, 'customer');
      _customer = res;
    })
    .then(done);
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        number: 4242424242424242,
        exp_month: 12,
        exp_year: 2035,
      };
      return payjp.customers.cards.create(_customer.id, query).then((res) => {
        assert.equal(res.object, 'card');
        assert.equal(res.last4, String(query.number).substr(-4));

        _card = res;
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.list(_customer.id).then((res) => {
        assert(res.count > 0);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.retrieve(_customer.id, _card.id).then((res) => {
        assert.ok(res.id, _card.id);
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        address_state: 'tokyo'
      };
      return payjp.customers.cards.update(_customer.id, _card.id, query).then((res) => {
        assert.equal(res.address_state, query.address_state);
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.customers.cards.delete(_customer.id, _card.id).then((res) => {
        assert.ok(res.deleted);
        assert.equal(res.id, _card.id);
      });
    });
  });

});
