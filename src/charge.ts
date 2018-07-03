import Resource from './resource';
import { ChargeResponse } from './interfaces';

export default class Charge extends Resource {

  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'charges';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query) as ChargeResponse[];
  }

  create(query = {}) {
    return this.request('POST', this.resource, query) as ChargeResponse;
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`) as ChargeResponse;
  }

  update(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}`, query) as ChargeResponse;
  }

  refund(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}/refund`, query) as ChargeResponse;
  }

  capture(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}/capture`, query) as ChargeResponse;
  }

}
