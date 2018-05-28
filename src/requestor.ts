/* global Buffer */

import * as superagent from 'superagent';

export default class Requestor {
  apikey: string;
  apibase: string;
  config: any;

  constructor(apikey: string, apibase: string, config: any = {}) {
    this.apikey = apikey;
    this.apibase = apibase;
    this.config = config;
  }

  buildHeader(method: string): object {
    const encodedKey = Buffer.from(`${this.apikey}:`).toString('base64');

    const headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };

    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return headers;
  }

  buildUrl(endpoint: string): string {
    return `${this.apibase}/${endpoint}`;
  }

  request(method: string, endpoint: string, query: object = {}, headers: object = {}): Promise<any> {
    const url = this.buildUrl(endpoint);
    const fixed_header = this.buildHeader(method);
    const header = Object.assign(fixed_header, headers);

    return new Promise((resolve, reject): any => {

      let request = superagent(method, url).set(header);

      if (method === 'GET' || method === 'DELETE') {
        request.query(query);
      } else if (method === 'POST' || method === 'PUT') {
        request.send(query);
      }

      if (this.config.cert !== null) {
        request.ca(this.config.cert);
      }

      request.end((err: any, res: superagent.Response) => {
        if (res.status === 200) {
          resolve(res.body);
        } else {
          reject(res);
        }
      });

    });

  }

}
