import Resource from './resource';

import { TransferResponse } from './interfaces';

export default class Transfer extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'transfers';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query) as TransferResponse[];
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`) as TransferResponse;
  }

  charges(id, query = {}) {
    return this.request('GET', `${this.resource}/${id}/charges`, query);
  }

}
