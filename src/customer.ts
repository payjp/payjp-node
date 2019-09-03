import Resource from './resource';
import Cards from './card';
import * as I from './index';

class CustomerSubscriptions extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'subscriptions';
  }

  list(id: string, query: I.CustomerSubscriptionListOptions = {}): Promise<I.List<I.Subscription>> {
    return this.request('GET', `customers/${id}/${this.resource}`, query);
  }

  retrieve(id: string, subscriptionId: string): Promise<I.Subscription> {
    return this.request('GET', `customers/${id}/${this.resource}/${subscriptionId}`);
  }

}

export default class Customers extends Resource {
  resource: string;
  cards: Cards;
  subscriptions: CustomerSubscriptions;

  constructor(payjp) {
    super(payjp);
    this.resource = 'customers';
    this.cards = new Cards(payjp);
    this.subscriptions = new CustomerSubscriptions(payjp);
  }

  list(query: I.ListOptions = {}): Promise<I.List<I.Customer>> {
    return this.request('GET', this.resource, query);
  }

  create(query: I.CustomerCreationOptions = {}): Promise<I.Customer> {
    return this.request('POST', this.resource, query);
  }

  retrieve(id: string): Promise<I.Customer> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  update(id: string, query: I.CustomerUpdateOptions = {}): Promise<I.Customer> {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  delete(id: string): Promise<I.Deleted> {
    return this.request('DELETE', `${this.resource}/${id}`);
  }

}
