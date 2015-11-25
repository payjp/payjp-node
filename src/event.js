import Resource from './resource';

export default class Event extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'events';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

}
