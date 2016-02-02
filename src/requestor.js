/* global Buffer */

import superagent from 'superagent';

export default class Requestor {

  constructor(apikey, apibase) {
    this.apikey = apikey;
    this.apibase = apibase;
  }

  buildHeader(method) {
    const encodedKey = new Buffer(`${this.apikey}:`).toString('base64');

    let headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };

    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return headers;
  }

  buildRequest(method, url, header, query) {
    let request = superagent(method, url).set(header);

    if (method === 'GET') {
      request.query(query);
    } else if (method === 'POST') {
      request.send(query);
    }

    return request;
  }

  request(method, endpoint, query = {}) {
    let url = `${this.apibase}/${endpoint}`;

    const header = this.buildHeader(method);

    return new Promise((resolve, reject) => {

      let request = superagent(method, url).set(header);

      if (method === 'GET') {
        request.query(query);
      } else if (method === 'POST') {
        request.send(query);
      }

      request.end((err, res) => {
        if (res.statusCode === 200) {
          resolve(res.body);
        } else {
          reject(err);
        }
      });

    });

  }

}
