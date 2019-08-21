const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.tenant_transfers.request = (...args) => Promise.resolve(args);

describe('TenantTransfer Resource', () => {

  it('Sends the correct request on list', () => {
    const query = {limit: 1};
    return payjp.tenant_transfers.list(query).then(([_method, _endpoint, _query]) => {
      assert(_method === 'GET');
      assert(_endpoint === 'tenant_transfers');
      assert.deepStrictEqual(_query, query);
    });
  });

  it('Sends the correct request on retrieve', () => {
    return payjp.tenant_transfers.retrieve('id123').then(([_method, _endpoint]) => {
      assert(_method === 'GET');
      assert(_endpoint === 'tenant_transfers/id123');
    });
  });
  ;

  it('Sends the correct request on charges', () => {
    const query = {limit: 1};
    return payjp.tenant_transfers.charges('id123', query).then(([_method, _endpoint, _query]) => {
      assert(_method === 'GET');
      assert(_endpoint === 'tenant_transfers/id123/charges');
      assert.deepStrictEqual(_query, query);
    });
  });

});
