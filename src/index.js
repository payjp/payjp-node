import Resource from './resource';
import Customer from './customer';

export default class Payjp {

  constructor(publicKey, config = {}) {
    if (!publicKey) {
      throw new Error('Please set publicKey.');
    }

    this.publicKey = publicKey;
    this.config = config;

    this.customers = new Customer();
  }

  set publicKey(key) {
    Resource.prototype._publicKey = key;
  }

  set config(config) {
    const _config = {
      host: config.host || 'api.pay.jp',
      port: config.port || 443,
      apibase: config.apibase || 'v1'
    };

    Resource.prototype.config = {
      host: _config.host,
      port: _config.port,
      apibase: _config.apibase
    };
  }

}
