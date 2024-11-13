import * as I from './index';
import Resource from './resource';

export default class Charges extends Resource {

  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'charges';
  }

  list(query: I.ChargeListOptions = {}): Promise<I.List<I.Charge>> {
    return this.request('GET', this.resource, query);
  }

  create(query: I.ChargeCreationOptions): Promise<I.Charge> {
    return this.request('POST', this.resource, query);
  }

  retrieve(id: string): Promise<I.Charge> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  update(id: string, query: I.ChargeUpdateOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  refund(id: string, query: I.RefundCreationOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/refund`, query);
  }

  reauth(id: string, query: I.ChargeReauthOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/reauth`, query);
  }

  capture(id: string, query: I.ChargeCaptureOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/capture`, query);
  }

  tds_finish(id: string): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/tds_finish`);
  }

}
