import Resource from './resource';

import * as I from './index';

export default class Transfers extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'transfers';
  }

  list(query: I.TransferListOptions = {}): Promise<I.List<I.Transfer>> {
    return this.request('GET', this.resource, query);
  }

  retrieve(id): Promise<I.Transfer> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  charges(id, query: I.TransferChargeListOptions = {}): Promise<I.List<I.Charge>> {
    return this.request('GET', `${this.resource}/${id}/charges`, query);
  }

}
