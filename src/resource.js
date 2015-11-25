import request from 'superagent';

export default class Resource {

  constructor(payjp) {
    this.payjp = payjp;
  }

  get apibase() {
    return this.payjp.config.apibase;
  }

  get publickey() {
    return this.payjp.publickey;
  }

  toQueryString(obj) {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p) && obj[p] !== null) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
    }
    return str.join('&');
  }

  request(endpoint, method, query = {}) {
    const encodedKey = new Buffer(`${this.publickey}:`).toString('base64');

    let _headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };

    let _url = `https://stage-api.pay.jp/${this.apibase}/${endpoint}`;

    let _query;

    if (method === 'GET') {
      if (Object.keys(query).length > 0) {
        let separator = _url.indexOf('?') !== -1 ? '&' : '?';
        _url = `${_url}${separator}${this.toQueryString(query)}`;
      }
    } else if (method === 'POST') {
      _headers['Content-Type'] = 'application/x-www-form-urlencoded';
      _query = query;
    }

    return new Promise((resolve, reject) => {
      console.log('header => ', _headers);
      console.log('body => ', _query);
      console.log('_url => ', _url);

      let _request = request(method, _url)
        .set(_headers)
      ;

      if (method === 'GET') {
        _request.query(_query);
      } else if (method === 'POST') {
        _request.send(_query);
      }

      _request
        .end((err, res) => {
          if (res.statusCode === 200) {
            resolve(res.body);
          } else {
            reject(err);
          }
        })
      ;

    });

  }

  list(query = {}) {
    return Promise.resolve(
      this.request(this.resource, 'GET', query)
    ).then(this.payjplize);
  }

  retrieve(query = {}) {
    return Promise.resolve(
      this.request(`${this.resource}/${query.id}`, 'GET')
    ).then(this.payjplize);
  }

  create(query = {}) {
    return Promise.resolve(
      this.request(this.resource, 'POST', query)
    ).then(this.payjplize);
  }

  update(id, query = {}) {
    return Promise.resolve(
      this.request(`${this.resource}/${id}`, 'POST', query)
    ).then(this.payjplize);
  }

  delete(query = {}) {
    return Promise.resolve(
      this.request(`${this.resource}/${query.id}`, 'DELETE')
    ).then(this.payjplize);
  }

}
