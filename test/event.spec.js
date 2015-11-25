import assert from 'power-assert';

import Payjp from '../src';

const AUTH_KEY = 'sk_test_c62fade9d045b54cd76d7036';

const payjp = new Payjp(AUTH_KEY);

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
