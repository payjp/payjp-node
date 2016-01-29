import Resource from './resource';

export default class Plan extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'plans';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query);
  }

  create(query = {}) {
    return this.request('POST', this.resource, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

  update(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  delete(id) {
    return this.request('DELETE', `${this.resource}/${id}`);
  }

}
