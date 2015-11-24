import Resource from './resource';
import Customer from './customer';

export default class Payjp {

  constructor(publickey, config = {}) {
    if (!publickey) {
      throw new Error('Please set publickey.');
    }

    this.publickey = publickey;
    this.config = this.makeConfig(config);

    this.customers = new Customer(this);
  }

  makeConfig(config) {
    return {
      host: config.host || 'api.pay.jp',
      port: config.port || 443,
      apibase: config.apibase || 'v1'
    }
  }

}
