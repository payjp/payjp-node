import Resource from './resource';
import * as I from './index';

export default class Terms extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'terms';
  }

  list(query: I.ListOptions = {}): Promise<I.List<I.Term>> {
    return this.request('GET', this.resource, query);
  }

  retrieve(id: string): Promise<I.Term> {
    return this.request('GET', `${this.resource}/${id}`);
  }
}
