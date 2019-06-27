import assert from 'power-assert';

import Requestor from '../src/requestor';
import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Transfer Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    payjp.transfers.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.transfers.list().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.transfers.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers/id123');
      });
    });
  });

  describe('charges', () => {
    it('Sends the correct request', () => {
      return payjp.transfers.charges('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'transfers/id123/charges');
      });
    });
  });

});
