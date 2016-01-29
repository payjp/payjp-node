import Resource from './resource';

export default class Token extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'tokens';
  }

  create(query = {}) {
    return this.request('POST', this.resource, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

}
