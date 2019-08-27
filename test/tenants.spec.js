const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.tenants.request = (...args) => Promise.resolve(args);

describe('Transfer Resource', () => {
  it('Sends the correct request on list', () => {
    const query = {limit: 1};
    return payjp.tenants.list(query).then(([_method, _endpoint, _query]) => {
      assert(_method === 'GET');
      assert(_endpoint === 'tenants');
      assert.deepStrictEqual(_query, query);
    });
  });

  it('Sends the correct request on retrieve', () => {
    return payjp.tenants.retrieve('id123').then(([_method, _endpoint]) => {
      assert(_method === 'GET');
      assert(_endpoint === 'tenants/id123');
    });
  });

  it('Sends the correct request on create', () => {
    const query = {name: 'test', 'platform_fee_rate': '10.00'};
    return payjp.tenants.create(query).then(([_method, _endpoint, _query]) => {
      assert(_method === 'POST');
      assert(_endpoint === 'tenants');
      assert.deepStrictEqual(_query, query);
    });
  });

  it('Sends the correct request on update', () => {
    const query = {name: 'test', 'platform_fee_rate': '10.00'};
    return payjp.tenants.update('id123', query).then(([_method, _endpoint, _query]) => {
      assert(_method === 'POST');
      assert(_endpoint === 'tenants/id123');
      assert.deepStrictEqual(_query, query);
    });
  });

  it('Sends the correct request on delete', () => {
    return payjp.tenants.delete('id123').then(([_method, _endpoint]) => {
      assert(_method === 'DELETE');
      assert(_endpoint === 'tenants/id123');
    });
  });

  it('Sends the correct request on applicationUrls', () => {
    return payjp.tenants.applicationUrls('id123').then(([_method, _endpoint]) => {
      assert(_method === 'POST');
      assert(_endpoint === 'tenants/id123/application_urls');
    });
  });

});
