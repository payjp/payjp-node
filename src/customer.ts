import Resource from './resource';
import Card from './card';

import { CustomerResponse, CustomerDeleted, SubscriptionResponse } from './interfaces';

class CustomerSubscription extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'subscriptions';
  }

  list(customer_id: string, query: object = {}) {
    return this.request('GET', `customers/${customer_id}/${this.resource}`, query) as SubscriptionResponse[];
  }

  retrieve(customer_id: string, id: string) {
    return this.request('GET', `customers/${customer_id}/${this.resource}/${id}`) as SubscriptionResponse;
  }

}

export default class Customer extends Resource {
  resource: string;
  cards: object;
  subscriptions: object;

  constructor(payjp) {
    super(payjp);
    this.resource = 'customers';
    this.cards = new Card(payjp);
    this.subscriptions = new CustomerSubscription(payjp);
  }

  list(query: object = {}) {
    return this.request('GET', this.resource, query) as CustomerResponse[];
  }

  create(query: object = {}) {
    return this.request('POST', this.resource, query) as CustomerResponse;
  }

  retrieve(id: string) {
    return this.request('GET', `${this.resource}/${id}`) as CustomerResponse;
  }

  update(id: string, query = {}) {
    return this.request('POST', `${this.resource}/${id}`, query) as CustomerResponse;
  }

  delete(id: string) {
    return this.request('DELETE', `${this.resource}/${id}`) as CustomerDeleted;
  }

}
