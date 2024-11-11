const assert = require('assert');
const Payjp = require('../built');
const config = require('./config');

const payjp = Payjp(config.apikey, config);
payjp.three_d_secure_requests.request = (...args) => Promise.resolve(args);

describe('ThreeDSecureRequest Resource', () => {
  describe('list', () => {
    it('Sends the correct request', () => {
      return payjp.three_d_secure_requests.list().then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'three_d_secure_requests');
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      const query = {
        resource_id: 'car_xxxxxxxxxxxxxxxxxxxxxxxxx'
      };
      return payjp.three_d_secure_requests.create(query).then(([_method, _endpoint]) => {
        assert(_method === 'POST');
        assert(_endpoint === 'three_d_secure_requests');
      });
    });
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.three_d_secure_requests.retrieve('id123').then(([_method, _endpoint]) => {
        assert(_method === 'GET');
        assert(_endpoint === 'three_d_secure_requests/id123');
      });
    });
  });

});
