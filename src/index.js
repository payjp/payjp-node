import Charge from './charge';
import Customer from './customer';
import Event from './event';
import Transfer from './transfer';

export default class Payjp {

  constructor(apikey, config = {}) {
    if (!apikey) {
      throw new Error('Please set apikey.');
    }

    this.apikey = apikey;
    this.config = this.makeConfig(config);

    this.charges = new Charge(this);
    this.customers = new Customer(this);
    this.events = new Event(this);
    this.transfers = new Transfer(this);
  }

  makeConfig(config) {
    return {
      host: config.host || 'api.pay.jp',
      port: config.port || 443,
      apibase: config.apibase || 'v1'
    };
  }

}
