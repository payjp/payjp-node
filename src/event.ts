import Resource from './resource';
import { EventResponse } from './interfaces';

export default class Event extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'events';
  }

  list(query: object = {}) {
    return this.request('GET', this.resource, query) as EventResponse[];
  }

  retrieve(id: string) {
    return this.request('GET', `${this.resource}/${id}`) as EventResponse;
  }

}
