import Requestor from './requestor';

interface ResourceInterface {
  payjp: any;
}

export default class Resource implements ResourceInterface {

  payjp: any

  constructor(payjp: any) {
    this.payjp = payjp;
  }

  get apibase(): string {
    return this.payjp.config.apibase;
  }

  get apikey(): string {
    return this.payjp.apikey;
  }

  request(method: string, endpoint: string, query = {}, headers: object = {}): object {
    const requestor = new Requestor(this.apikey, this.apibase, this.payjp.config);
    return requestor.request(method, endpoint, query, headers);
  }

}
