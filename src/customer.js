import Resource from './resource';

export default class Customer extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'customers';
  }

  payjplize(obj) {
    // for (let i = 0; i < obj.data.length; i++) {
    //   obj.data[i].id = `payjp.${obj.data[i].id}`;
    // }
    return obj;
  }

}
