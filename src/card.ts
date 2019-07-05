import Resource from './resource';
import { CardResponse, CardDeleted } from './interfaces';

export default class Card extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'cards';
  }

  list(customer_id: string, query: object = {}) {
    return this.request('GET', `customers/${customer_id}/${this.resource}`, query) as CardResponse[];
  }

  create(customer_id: string, query: object = {}) {
    return this.request('POST', `customers/${customer_id}/${this.resource}`, query) as CardResponse;
  }

  retrieve(customer_id: string, id: string) {
    return this.request('GET', `customers/${customer_id}/${this.resource}/${id}`) as CardResponse;
  }

  update(customer_id: string, id: string, query: object = {}) {
    return this.request('POST', `customers/${customer_id}/${this.resource}/${id}`, query) as CardResponse;
  }

  delete(customer_id: string, id: string) {
    return this.request('DELETE', `customers/${customer_id}/${this.resource}/${id}`) as CardDeleted;
  }

}
