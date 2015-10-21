import Resource from './resource';

export default class Customer extends Resource {

  payjplize(obj) {
    for (var i = 0; i < obj.data.length; i++) {
      obj.data[i].id = `payjp.${obj.data[i].id}`;
    }
    return obj;
  }

  list(query = {}) {
    return Promise.resolve(
      this.request('customers', 'GET', query)
    ).then(this.payjplize);
  }

  retrieve(query = {}) {
    return this.request(`customers/${query.id}`, 'GET', query);
  }

  create(query = {}) {
    return this.request('customers', 'POST', query);
  }

  update(query = {}) {
    return this.request('customers', 'POST', query);
  }

}
