const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.balances.request = (...args) => Promise.resolve(args);

describe('Balance Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      const query = {limit: 1};
      return payjp.balances.list(query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'balances');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.balances.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'balances/id123');
      });
    });
  });

  describe('statementUrls', () => {
    it('Sends the correct request', () => {
      const query = {platformer: false};
      return payjp.balances.statementUrls('id123', query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'balances/id123/statement_urls');
        assert.deepStrictEqual(_query, query);
      });
    });
  });
});
