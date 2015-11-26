import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

// Subscriptions

describe('Customer\'s subscription Resource', () => {

  var _customer;

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

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.list(_customer.id).then((res) => {
        assert.equal(res.object, 'list');
      });
    });
  });

  // describe('retrieve', () => {
  //   it('Sends the correct request', () => {
  //     return payjp.customers.subscriptions.retrieve(_customer.id).then((res) => {
  //       assert.ok(res.id, _customer.id);
  //     });
  //   });
  // });

});
