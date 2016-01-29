import assert from 'power-assert';

import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Events Resource', () => {

  var _event;

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.events.list().then((res) => {
        assert(res.count > 0);
        _event = res.data[0];
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.events.retrieve(_event.id).then((res) => {
        assert.ok(res.id, _event.id);
      });
    });
  });

});
