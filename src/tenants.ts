import type * as I from "./index";
import Resource from "./resource";

export default class Tenants extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "tenants";
  }

  list(query: I.ListOptions = {}): Promise<I.List<I.Tenant>> {
    return this.request("GET", this.resource, query);
  }

  create(query: I.TenantCreationOptions): Promise<I.Tenant> {
    return this.request("POST", this.resource, query);
  }

  retrieve(id: string): Promise<I.Tenant> {
    return this.request("GET", `${this.resource}/${id}`);
  }

  update(id: string, query: I.TenantUpdateOptions = {}): Promise<I.Tenant> {
    return this.request("POST", `${this.resource}/${id}`, query);
  }

  delete(id: string): Promise<I.Deleted> {
    return this.request("DELETE", `${this.resource}/${id}`);
  }

  applicationUrls(id: string): Promise<I.ApplicationUrl> {
    return this.request("POST", `${this.resource}/${id}/application_urls`);
  }
}
