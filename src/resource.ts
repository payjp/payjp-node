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

  private getCurrentDelay(retryCount: number, initialDelay: number, maxDelay: number): number {
    const delay = Math.min(initialDelay * 2 ** retryCount, maxDelay)
    return Math.ceil(delay / 2 * (1 + Math.random()))
  }

  protected request<I>(method: string, endpoint: string, query: object = {}, headers: object = {}): Promise<I> {
    const url = `${this.payjp.config.apibase}/${endpoint}`;
    const header: object = Object.assign(this.buildHeader(method), headers);

    const doRequest = (): superagent.SuperAgentRequest => {
      let request: superagent.SuperAgentRequest = superagent(method, url).set(header);
      if (method === 'GET' || method === 'DELETE') {
        request = request.query(query);
      } else { // (method === 'POST' || method === 'PUT')
        request = request.send(query);
      }
      if (this.payjp.config.timeout > 0) {
        request = request.timeout(this.payjp.config.timeout);
      }
      return request
    }

    let retryCount = 0;
    const retry = (resolve: (res: superagent.Response) => void, reject: (reason: any) => void) => doRequest().then(resolve).catch((res: superagent.Response) => {
      if (res.status === 429 && retryCount < this.payjp.config.maxRetry) {
        const delayWithJitter = this.getCurrentDelay(retryCount, this.payjp.config.retryInitialDelay, this.payjp.config.retryMaxDelay)
        retryCount++;
        setTimeout(() => retry(resolve, reject), delayWithJitter);
      } else {
        return reject(res);
      }
    });
    return new Promise<superagent.Response>(retry).then(res => res.body);

  }
}
