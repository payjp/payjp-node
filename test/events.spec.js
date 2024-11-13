const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.events.request = (...args) => Promise.resolve(args);
describe('Events Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.events.list().then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'events');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.events.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'events/id123');
      });
    });
  });

});
