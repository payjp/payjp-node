import type * as I from "./index";
import Resource from "./resource";

export default class Balances extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "balances";
  }

  list(query: I.BalanceListOptions = {}): Promise<I.List<I.Balance>> {
    return this.request("GET", this.resource, query);
  }

  retrieve(id: string): Promise<I.Balance> {
    return this.request("GET", `${this.resource}/${id}`);
  }

  statementUrls(id: string, query: I.StatementUrlOptions = {}): Promise<I.StatementUrl> {
    return this.request("POST", `${this.resource}/${id}/statement_urls`, query);
  }
}
