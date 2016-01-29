import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

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
