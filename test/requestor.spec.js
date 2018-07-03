/* global Buffer */

import assert from 'power-assert';

import Requestor from '../built/requestor';

describe('HTTP Requestor', () => {

  var _requestor;

  before(() => {
    _requestor = new Requestor('apikey', 'https://api.pay.jp/v999');
  });

  describe('buildHeader', () => {

    const encodedKey = new Buffer(`${'apikey'}:`).toString('base64');

    it('GET', () => {
      let header = _requestor.buildHeader('GET');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === undefined);
    });

    it('POST', () => {
      let header = _requestor.buildHeader('POST');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === 'application/x-www-form-urlencoded');
    });

    it('DELETE', () => {
      let header = _requestor.buildHeader('DELETE');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === undefined);
    });
  });

  describe('buildUrl', () => {

    it('return correct endpoint', () => {
      let url = _requestor.buildUrl('charges');
      assert(url === 'https://api.pay.jp/v999/charges');
    });

  });


});
