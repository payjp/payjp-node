import Resource from './resource';
import * as I from './index';

export default class Accounts extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'accounts';
  }

  retrieve(): Promise<I.Account> {
    return this.request('GET', `${this.resource}`);
  }

}
