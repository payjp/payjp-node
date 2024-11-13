const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.statements.request = (...args) => Promise.resolve(args);

describe('Statement Resource', () => {

  describe('list', () => {
    it('Sends the correct request', () => {
      const query = {limit: 1};
      return payjp.statements.list(query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'statements');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.statements.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'statements/id123');
      });
    });
  });

  describe('statementUrls', () => {
    it('Sends the correct request', () => {
      const query = {platformer: false};
      return payjp.statements.statementUrls('id123', query).then(([_method, _endpoint, _query]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'statements/id123/statement_urls');
        assert.deepStrictEqual(_query, query);
      });
    });
  });

});
