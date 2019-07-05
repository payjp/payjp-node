import Resource from './resource';
import { AccountResponse } from './interfaces';

export default class Account extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'accounts';
  }

  retrieve(){
    return this.request('GET', `${this.resource}`) as AccountResponse;
  }

}
