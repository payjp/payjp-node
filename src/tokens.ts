import Resource from './resource';

import * as I from './index';

export default class Tokens extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'tokens';
  }

  create(query: object = {}, headers: object = {}): Promise<I.Token> {
    return this.request('POST', this.resource, query, headers);
  }

  retrieve(id: string): Promise<I.Token> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  tds_finish(id: string): Promise<I.Token> {
    return this.request('POST', `${this.resource}/${id}/tds_finish`);
  }

}
