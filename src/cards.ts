import type * as I from "./index";
import Resource from "./resource";

export default class Cards extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "cards";
  }

  list(customerId: string, query: I.ListOptions = {}): Promise<I.List<I.Card>> {
    return this.request("GET", `customers/${customerId}/${this.resource}`, query);
  }

  create(customerId: string, query: object = {}): Promise<I.Card> {
    return this.request("POST", `customers/${customerId}/${this.resource}`, query);
  }

  retrieve(customerId: string, id: string): Promise<I.Card> {
    return this.request("GET", `customers/${customerId}/${this.resource}/${id}`);
  }

  update(customerId: string, id: string, query: object = {}): Promise<I.Card> {
    return this.request("POST", `customers/${customerId}/${this.resource}/${id}`, query);
  }

  delete(customerId: string, id: string): Promise<I.Deleted> {
    return this.request("DELETE", `customers/${customerId}/${this.resource}/${id}`);
  }
}
