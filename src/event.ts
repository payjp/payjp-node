import Resource from './resource';
import * as I from './index';

export default class Events extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'events';
  }

  list(query: I.PayjpEventListRequest = {}): Promise<I.List<I.Event>> {
    return this.request('GET', this.resource, query);
  }

  retrieve(id: string): Promise<I.Event> {
    return this.request('GET', `${this.resource}/${id}`);
  }

}
