import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

describe('Transfer Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.transfers.list().then((res) => {
        assert.equal(res.object, 'list');
        assert.equal(res.url, '/v1/transfers');
      });
    });
  });

});
