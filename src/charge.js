import Resource from './resource';

export default class Charge extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'charges';
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

  refund(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}/refund`, query);
  }

  capture(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}/capture`, query);
  }

}
