import Resource from './resource';
import * as I from './index';

export default class Balances extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'balances';
  }

  list(query: I.BalanceListOptions = {}): Promise<I.List<I.Balance>> {
    return this.request('GET', this.resource, query);
  }

  retrieve(id: string): Promise<I.Balance> {
    return this.request('GET', `${this.resource}/${id}`);
  }
}
