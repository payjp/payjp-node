import type * as I from "./index";
import Resource from "./resource";

export default class Accounts extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "accounts";
  }

  retrieve(): Promise<I.Account> {
    return this.request("GET", `${this.resource}`);
  }
}
