import * as fs from "fs";

import Charge from './charge';
import Customer from './customer';
import Plan from './plan';
import Subscription from './subscription';
import Token from './token';
import Transfer from './transfer';
import Event from './event';
import Account from './account';

interface Payjp {
  charges: Charge;
  customers: Customer;
  plans: Plan;
  subscriptions: Subscription;
  tokens: Token;
  transfers: Transfer;
  events: Event;
  accounts: Account;
}

function __initialize(apikey: string, config: { apibase?: string, cert?: string}): Payjp {
  const obj: any = {};

  obj.apikey = apikey;
  obj.config = ((_) => {
    return {
      apibase: _.apibase || 'https://api.pay.jp/v1',
      cert: _.cert || null
    };
  })(config);

  if (obj.config.cert !== null) {
    obj.config.cert = fs.readFileSync(obj.config.cert);
  }

  obj.charges = new Charge(obj);
  obj.customers = new Customer(obj);
  obj.plans = new Plan(obj);
  obj.subscriptions = new Subscription(obj);
  obj.tokens = new Token(obj);
  obj.transfers = new Transfer(obj);
  obj.events = new Event(obj);
  obj.accounts = new Account(obj);

  return obj;
}

export default function Payjp(apikey: string, config = {}): Payjp {

  if (!apikey) {
    throw new Error('Please set apikey.');
  }

  return __initialize(apikey, config);
}
