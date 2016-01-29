import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

describe('Accounts Resource', () => {

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.accounts.retrieve().then((res) => {
        assert.equal(res.object, 'account');
        assert.ok(res.id);
      });
    });
  });

});
