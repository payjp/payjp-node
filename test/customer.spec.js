import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

describe('Customers Resource', () => {

  var _customer;

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.list().then((res) => {
        assert(res.count > 0);
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        email: 'payjp-node@example.com'
      };
      return payjp.customers.create(query).then((res) => {
        assert.equal(res.object, 'customer');
        assert.equal(res.email, query.email);

        _customer = res;
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.retrieve(_customer.id).then((res) => {
        assert.ok(res.id, _customer.id);
        console.log(res);
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        email: 'payjp-node-updated@example.com'
      };
      return payjp.customers.update(_customer.id, query).then((res) => {
        assert.equal(res.email, query.email);
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.customers.delete(_customer.id).then((res) => {
        assert.ok(res.deleted);
        assert.equal(res.id, _customer.id);
      });
    });
  });

});
