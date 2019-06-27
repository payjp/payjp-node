import assert from 'power-assert';

import Requestor from '../src/requestor';
import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Charges Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    payjp.charges.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.charges.list().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'charges');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 1000,
        currency: 'jpy',
        card: {
          number: 4242424242424242,
          exp_month: 12, // eslint-disable-line camelcase
          exp_year: 2035, // eslint-disable-line camelcase
        },
        capture: false
      };
      return payjp.charges.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.charges.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        description: 'oppai'
      };
      return payjp.charges.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123');
      });
    });
  });

  describe('capture', () => {
    it('Sends the correct request', () => {
      const query = {
        amount: 700
      };
      return payjp.charges.capture('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/capture');
      });
    });
  });

  describe('refund', () => {
    it('Sends the correct request', () => {
      const query = {
        refund_reason: 'no oppai' // eslint-disable-line camelcase
      };
      return payjp.charges.refund('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'charges/id123/refund');
      });
    });
  });

});
