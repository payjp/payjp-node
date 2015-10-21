import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

var payjp = new Payjp(AUTH_KEY);

describe('Customers Resource', function () {

  describe('list', function () {
    it('Sends the correct request', function () {
      return payjp.customers.list().then((res) => {
        assert(res.count > 0);
      });
    });
  });

  // describe('create', function () {
  //   it('Sends the correct request', function () {
  //     const query = {};
  //     return payjp.customers.create(query).then((res) => {
  //       assert('id' in res.body);
  //     });
  //   });
  // });
  //
  // describe('retrieve', function () {
  //   it('Sends the correct request', function () {
  //     return payjp.customers.retrieve(this.customer.id).then((res) => {
  //       assert('id' in res.body); // てきとう
  //     });
  //   });
  // });

});
