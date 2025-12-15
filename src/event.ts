import type * as I from "./index";
import Resource from "./resource";

export default class Events extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "events";
  }

  list(query: I.EventListOptions = {}): Promise<I.List<I.Event>> {
    return this.request("GET", this.resource, query);
  }

  retrieve(id: string): Promise<I.Event> {
    return this.request("GET", `${this.resource}/${id}`);
  }
}
