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

}
