import Resource from './resource';

import { TokenResponse } from './interfaces';

export default class Token extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'tokens';
  }

  create(query: object = {}, headers: object = {}) {
    return this.request('POST', this.resource, query, headers) as TokenResponse;
  }

  retrieve(id: string) {
    return this.request('GET', `${this.resource}/${id}`) as TokenResponse;
  }

}
