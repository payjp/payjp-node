const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.subscriptions.request = (...args) => Promise.resolve(args);

describe('Subscription Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.list().then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'subscriptions');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        customer: 'cus_id456',
        plan: 'pln_id789'
      };
      return payjp.subscriptions.create(query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        plan: 'pln_id789'
      };
      return payjp.subscriptions.update('id123', query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

  describe('pause', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.pause('id123').then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/pause');
      });
    });
  });

  describe('resume', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.resume('id123').then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/resume');
      });
    });
  });

  describe('cancel', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.cancel('id123').then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/cancel');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      const query = {
        prorate: true
      };
      return payjp.subscriptions.delete('id123', query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'subscriptions/id123');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

});
