import type * as I from "./index";
import Resource from "./resource";

export default class Subscriptions extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "subscriptions";
  }

  list(query: I.SubscriptionListOptions = {}): Promise<I.List<I.Subscription>> {
    return this.request("GET", this.resource, query);
  }

  create(query: I.SubscriptionCreationOptions): Promise<I.Subscription> {
    return this.request("POST", this.resource, query);
  }

  update(id: string, query: I.SubscriptionUpdateOptions = {}): Promise<I.Subscription> {
    return this.request("POST", `${this.resource}/${id}`, query);
  }

  retrieve(id: string): Promise<I.Subscription> {
    return this.request("GET", `${this.resource}/${id}`);
  }

  pause(id: string): Promise<I.Subscription> {
    return this.request("POST", `${this.resource}/${id}/pause`);
  }

  resume(id: string, query: I.SubscriptionResumeOptions = {}): Promise<I.Subscription> {
    return this.request("POST", `${this.resource}/${id}/resume`, query);
  }

  cancel(id: string): Promise<I.Subscription> {
    return this.request("POST", `${this.resource}/${id}/cancel`);
  }

  delete(id: string, query: I.SubscriptionDeleteOptions = {}): Promise<I.Deleted> {
    return this.request("DELETE", `${this.resource}/${id}`, query);
  }
}
