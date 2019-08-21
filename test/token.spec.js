const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.tokens.request = (...args) => Promise.resolve(args);
describe('Tokens Resource', () => {

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {};
      const headers = {};
      return payjp.tokens.create(query, headers).then(([_method, _endpoint, _query, _headers]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'tokens');
        assert.deepStrictEqual(_query, query);
        assert.deepStrictEqual(_headers, headers);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.tokens.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'tokens/id123');
      });
    });
  });

});
