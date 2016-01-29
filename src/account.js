import Resource from './resource';

export default class Account extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'accounts';
  }

  retrieve() {
    return this.request('GET', `${this.resource}`);
  }

}
