import assert from 'power-assert';

import Requestor from '../src/requestor';
import Payjp from '../src';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Subscription Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    Requestor.prototype.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.list().then(() => {
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
      return payjp.subscriptions.create(query).then(() => {
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
      return payjp.subscriptions.update('id123', query).then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

  describe('pause', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.pause('id123').then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/pause');
      });
    });
  });

  describe('resume', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.resume('id123').then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/resume');
      });
    });
  });

  describe('cancel', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.cancel('id123').then(() => {
        assert(_method === 'POST');
        assert(_endpoint === 'subscriptions/id123/cancel');
      });
    });
  });

  describe('customer\'s subscription list', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.list('cus_id456').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions');
      });
    });
  });

  describe('customer\'s subscription retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.customers.subscriptions.retrieve('cus_id456', 'id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'customers/cus_id456/subscriptions/id123');
      });
    });
  });

  describe('delete', () => {
    it('Sends the correct request', () => {
      return payjp.subscriptions.delete('id123').then(() => {
        assert(_method === 'DELETE');
        assert(_endpoint === 'subscriptions/id123');
      });
    });
  });

});
