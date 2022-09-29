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

  retrieve(id): Promise<I.Charge> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  update(id, query: I.ChargeUpdateOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  refund(id, query: I.RefundCreationOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/refund`, query);
  }

  reauth(id, query: I.ChargeReauthOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/reauth`, query);
  }

  capture(id, query: I.ChargeCaptureOptions = {}): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/capture`, query);
  }

  tds_finish(id): Promise<I.Charge> {
    return this.request('POST', `${this.resource}/${id}/tds_finish`);
  }

}
