const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {subscriptions} = Payjp(config.apikey, config);

describe('Subscription Resource', () => {

  var _method;
  var _endpoint;
  var _query;

  before(() => {
    subscriptions.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      if (Object.keys(args).length > 2) {
        _query = args[2];
      }
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return subscriptions.list().then(() => {
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
      return subscriptions.create(query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions');
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      const query = {
        plan: 'pln_id789'
      };
      return subscriptions.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return subscriptions.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

  describe('pause', () => {
    it('Sends the correct request', () => {
      return subscriptions.pause('id123').then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/pause');
      });
    });
  });

  describe('resume', () => {
    it('Sends the correct request', () => {
      return subscriptions.resume('id123').then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/resume');
      });
    });
  });

  describe('cancel', () => {
    it('Sends the correct request', () => {
      return subscriptions.cancel('id123').then(() => {
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
      return subscriptions.delete('id123', query).then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'subscriptions/id123');
        assert(_query === query);
      });
    });
  });

});
