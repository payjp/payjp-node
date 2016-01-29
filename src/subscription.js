import Resource from './resource';

export default class Subscription extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'subscriptions';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query);
  }

  create(query = {}) {
    return this.request('POST', this.resource, query);
  }

  update(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

  pause(id) {
    return this.request('POST', `${this.resource}/${id}/pause`);
  }

  resume(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}/resume`, query);
  }

  cancel(id) {
    return this.request('POST', `${this.resource}/${id}/cancel`);
  }

  delete(id) {
    return this.request('DELETE', `${this.resource}/${id}`);
  }

}
