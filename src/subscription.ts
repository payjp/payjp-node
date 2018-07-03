import Resource from './resource';

import { SubscriptionResponse, SubscriptionDeleted } from './interfaces';

export default class Subscription extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'subscriptions';
  }

  list(query: object = {}) {
    return this.request('GET', this.resource, query) as SubscriptionResponse[];
  }

  create(query: object = {}) {
    return this.request('POST', this.resource, query) as SubscriptionResponse;
  }

  update(id: string, query: object = {}) {
    return this.request('POST', `${this.resource}/${id}`, query) as SubscriptionResponse;
  }

  retrieve(id: string) {
    return this.request('GET', `${this.resource}/${id}`) as SubscriptionResponse;
  }

  pause(id: string) {
    return this.request('POST', `${this.resource}/${id}/pause`) as SubscriptionResponse;
  }

  resume(id: string, query: object = {}) {
    return this.request('POST', `${this.resource}/${id}/resume`, query) as SubscriptionResponse;
  }

  cancel(id: string) {
    return this.request('POST', `${this.resource}/${id}/cancel`) as SubscriptionResponse;
  }

  delete(id: string, query: object = {}) {
    return this.request('DELETE', `${this.resource}/${id}`, query) as SubscriptionDeleted;
  }

}
