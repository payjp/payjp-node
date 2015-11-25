import Requestor from './requestor';

export default class Resource {

  constructor(payjp) {
    this.payjp = payjp;
  }

  get apibase() {
    return this.payjp.config.apibase;
  }

  get apikey() {
    return this.payjp.apikey;
  }

  request(method, endpoint, query = {}) {
    const requestor = new Requestor(
      this.apikey, this.apibase
    );
    return requestor.request(method, endpoint, query);
  }

  payjplize(obj) {
    // for (let i = 0; i < obj.data.length; i++) {
    //   obj.data[i].id = `payjp.${obj.data[i].id}`;
    // }
    return obj;
  }

  // list(query = {}) {
  //   return Promise.resolve(
  //     this.request('GET', this.resource, query)
  //   ).then(this.payjplize);
  // }

  // retrieve(id) {
  //   return Promise.resolve(
  //     this.request('GET', `${this.resource}/${id}`)
  //   ).then(this.payjplize);
  // }

  // create(query = {}) {
  //   return Promise.resolve(
  //     this.request('POST', this.resource, query)
  //   ).then(this.payjplize);
  // }

  // update(id, query = {}) {
  //   return Promise.resolve(
  //     this.request('POST', `${this.resource}/${id}`, query)
  //   ).then(this.payjplize);
  // }

  // delete(id) {
  //   return Promise.resolve(
  //     this.request('DELETE', `${this.resource}/${id}`)
  //   ).then(this.payjplize);
  // }

}
