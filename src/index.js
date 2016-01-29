import Charge from './charge';
import Customer from './customer';
import Plan from './plan';
import Subscription from './subscription';
import Token from './token';
import Transfer from './transfer';
import Event from './event';
import Account from './account';

export default class Payjp {

  constructor(apikey, config = {}) {
    if (!apikey) {
      throw new Error('Please set apikey.');
    }

    this.apikey = apikey;
    this.config = this.makeConfig(config);

    this.charges = new Charge(this);
    this.customers = new Customer(this);
    this.plans = new Plan(this);
    this.subscriptions = new Subscription(this);
    this.tokens = new Token(this);
    this.transfers = new Transfer(this);
    this.events = new Event(this);
    this.accounts = new Account(this);
  }

  makeConfig(config) {
    return {
      host: config.host || 'https://api.pay.jp',
      port: config.port || 443,
      apibase: config.apibase || 'v1'
    };
  }

}
