import request from 'superagent';

export default class Resource {

  request(endpoint, method, query) {
    console.log('key in request(), => ', this.key);
    console.log(endpoint, method, query);
  }

  get apibase() {
    return this.config.apibase;
  }

  set publicKey(key) {
    this._publicKey = key;
  }

  get publicKey() {
    return this._publicKey;
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

  request(endpoint, method, query) {
    const encodedKey = new Buffer(`${this.publicKey}:`).toString('base64');

    let _headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };
    let _url;
    let _query;

    _url = `https://api.pay.jp/${this.config.apibase}/${endpoint}`;

    if (method === 'GET') {
      if (query) {
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

      request(method, _url, _query)
        .set(_headers)
        .query(_query)
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

}
