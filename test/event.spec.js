const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const {events} = Payjp(config.apikey, config);

describe('Events Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    events.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      return events.list().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'events');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return events.retrieve('id123').then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'events/id123');
      });
    });
  });

});
