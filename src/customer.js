import Resource from './resource';
import Card from './card';

class Subscription extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'subscriptions';
  }

  list(customer_id, query = {}) {
    return this.request('GET', `customers/${customer_id}/${this.resource}`, query);
  }

  retrieve(customer_id, id) {
    return this.request('GET', `customers/${customer_id}/${this.resource}/${id}`);
  }

}

export default class Customer extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'customers';
    this.cards = new Card(payjp);
    this.subscriptions = new Subscription(payjp);
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
