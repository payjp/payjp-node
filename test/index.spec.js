const assert = require('assert');
const Payjp = require('../built');

describe('Payjp', () => {
  it('can construct myself', () => {
    const payjp = Payjp('sk_test');
    assert(payjp.apikey === 'sk_test');
    assert(typeof payjp.charges.create === 'function');

    const payjpWithConfig = Payjp('sk_test', {apibase: 'http://localhost:8080/', timeout: 2000});
    assert(payjpWithConfig.config.apibase === 'http://localhost:8080/');
    assert(payjpWithConfig.config.timeout === 2000);
  });
  it('cannot construct myself without apikey', () => {
    assert.throws(() => {
      Payjp();
    }, /^Error: Please set apikey.$/);
    assert.throws(() => {
      Payjp(null);
    }, /^Error: Please set apikey.$/);
    assert.throws(() => {
      Payjp('');
    }, /^Error: Please set apikey.$/);
  });
  it('cannot construct myself with public apikey', () => {
    assert.throws(() => {
      Payjp('pk_test');
    }, /^Error: You cannot use the public apikey in this SDK.$/);
  });
});
