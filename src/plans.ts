import type * as I from "./index";
import Resource from "./resource";

export default class Plans extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "plans";
  }

  list(query: I.ListOptions = {}): Promise<I.List<I.Plan>> {
    return this.request("GET", this.resource, query);
  }

  create(query: I.PlanCreationOptions): Promise<I.Plan> {
    return this.request("POST", this.resource, query);
  }

  retrieve(id: string): Promise<I.Plan> {
    return this.request("GET", `${this.resource}/${id}`);
  }

  update(id: string, query: I.PlanUpdateOptions = {}): Promise<I.Plan> {
    return this.request("POST", `${this.resource}/${id}`, query);
  }

  delete(id: string): Promise<I.Deleted> {
    return this.request("DELETE", `${this.resource}/${id}`);
  }
}
