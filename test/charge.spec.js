import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

describe('Charges Resource', () => {

  var _charge;

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.charges.list().then((res) => {
        assert(res.count > 0);
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 1000,
        currency: 'jpy',
        card: {
          number: 4242424242424242,
          exp_month: 12, // eslint-disable-line camelcase
          exp_year: 2035, // eslint-disable-line camelcase
        },
        capture: false
      };
      return payjp.charges.create(query).then((res) => {
        assert.equal(res.object, 'charge');
        assert.equal(res.email, query.email);
        assert(res.captured === false);

        _charge = res;
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.charges.retrieve(_charge.id).then((res) => {
        assert.ok(res.id, _charge.id);
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        description: 'oppai'
      };
      return payjp.charges.update(_charge.id, query).then((res) => {
        assert.equal(res.description, query.description);
      });
    });
  });

  describe('capture', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 700
      };
      return payjp.charges.capture(_charge.id, query).then((res) => {
        assert.equal(res.amount - res.amount_refunded, query.amount);
      });
    });
  });

  describe('refund', () => {
    it('Sends the correct request', () => {
      const query = {
        refund_reason: 'no oppai' // eslint-disable-line camelcase
      };
      return payjp.charges.refund(_charge.id, query).then((res) => {
        assert.equal(res.refund_reason, query.refund_reason);
      });
    });
  });

});
