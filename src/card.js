import Resource from './resource';

export default class Card extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'cards';
  }

  list(customer_id, query = {}) {
    return this.request('GET', `customers/${customer_id}/${this.resource}`, query);
  }

  create(customer_id, query = {}) {
    return this.request('POST', `customers/${customer_id}/${this.resource}`, query);
  }

  retrieve(customer_id, id) {
    return this.request('GET', `customers/${customer_id}/${this.resource}/${id}`);
  }

  update(customer_id, id, query = {}) {
    return this.request('POST', `customers/${customer_id}/${this.resource}/${id}`, query);
  }

  delete(customer_id, id) {
    return this.request('DELETE', `customers/${customer_id}/${this.resource}/${id}`);
  }

}
