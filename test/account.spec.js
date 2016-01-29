import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

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
