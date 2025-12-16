import type * as I from "./index";
import Resource from "./resource";

export default class ThreeDSecureRequests extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "three_d_secure_requests";
  }

  list(query: I.ThreeDSecureRequestListOptions = {}): Promise<I.List<I.ThreeDSecureRequest>> {
    return this.request("GET", this.resource, query);
  }

  create(query: I.ThreeDSecureRequestCreationOptions): Promise<I.ThreeDSecureRequest> {
    return this.request("POST", this.resource, query);
  }

  retrieve(id: string): Promise<I.ThreeDSecureRequest> {
    return this.request("GET", `${this.resource}/${id}`);
  }
}
