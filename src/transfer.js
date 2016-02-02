import Resource from './resource';

export default class Transfer extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'transfers';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

  charges(id, query = {}) {
    return this.request('GET', `${this.resource}/${id}/charges`, query);
  }

}
