/* global Buffer */

import r from 'superagent';

export default class Requestor {

  constructor(apikey, host, port, apibase) {
    this.apikey = apikey;
    this.host = host;
    this.port = port;
    this.apibase = apibase;
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

  request(method, endpoint, query = {}) {
    const encodedKey = new Buffer(`${this.apikey}:`).toString('base64');

    let _headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };

    let _url = `${this.host}/${this.apibase}/${endpoint}`;

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
      // console.log('header => ', _headers);
      // console.log('body   => ', _query);
      // console.log('_url   => ', _url);

      let _request = r(method, _url)
        .set(_headers)
        .set('port', this.port)
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

}
