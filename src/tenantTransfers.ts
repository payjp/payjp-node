import type * as I from "./index";
import Resource from "./resource";

export default class TenantTransfers extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = "tenant_transfers";
  }

  list(query: I.TenantTransferListOptions = {}): Promise<I.List<I.TenantTransfer>> {
    return this.request("GET", this.resource, query);
  }

  retrieve(id: string): Promise<I.TenantTransfer> {
    return this.request("GET", `${this.resource}/${id}`);
  }

  charges(id: string, query: I.TransferChargeListOptions = {}): Promise<I.List<I.Charge>> {
    return this.request("GET", `${this.resource}/${id}/charges`, query);
  }

  statementUrls(id: string, query: I.StatementUrlOptions = {}): Promise<I.StatementUrl> {
    return this.request("POST", `${this.resource}/${id}/statement_urls`, query);
  }
}
