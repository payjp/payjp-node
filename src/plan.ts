import Resource from './resource';

import { PlanResponse, PlanDeleted } from './interfaces';

export default class Plan extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'plans';
  }

  list(query: object = {}) {
    return this.request('GET', this.resource, query) as PlanResponse[];

  }
  create(query: object = {}) {
    return this.request('POST', this.resource, query) as PlanResponse;
  }

  retrieve(id: string): object {
    return this.request('GET', `${this.resource}/${id}`) as PlanResponse;
  }

  update(id: string, query: object = {}): object {
    return this.request('POST', `${this.resource}/${id}`, query) as PlanResponse;
  }

  delete(id: string) {
    return this.request('DELETE', `${this.resource}/${id}`) as PlanDeleted;
  }

}
