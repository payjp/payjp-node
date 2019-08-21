/// <reference types="node" />
import * as superagent from 'superagent';
import * as I from './index';

interface Config {
  apikey: string,
  config: I.PayjpOptions,
}

export default class Resource {
  payjp: Config

  constructor(payjp: Config) {
    this.payjp = payjp;
  }

  get apibase(): string {
    return this.payjp.config.apibase;
  }

  get apikey(): string {
    return this.payjp.apikey;
  }

  private buildHeader(method: string): object {
    const encodedKey = Buffer.from(`${this.payjp.apikey}:`).toString('base64');
    const headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };
    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return headers;
  }

  protected request(method: string, endpoint: string, query: object = {}, headers: object = {}): Promise<any> {
    const url: string = `${this.payjp.config.apibase}/${endpoint}`;
    const header: object = Object.assign(this.buildHeader(method), headers);

    let request: superagent.SuperAgentRequest = superagent(method, url).set(header);
    if (method === 'GET' || method === 'DELETE') {
      request = request.query(query);
    } else { // (method === 'POST' || method === 'PUT')
      request = request.send(query);
    }
    if (this.payjp.config.timeout > 0) {
      request = request.timeout(this.payjp.config.timeout);
    }

    return request.then((res: superagent.Response): any => res.body)
  }
}
