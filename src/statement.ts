import Resource from './resource';
import * as I from './index';

export default class Statements extends Resource {
  resource: string;

  constructor(payjp) {
    super(payjp);
    this.resource = 'statements';
  }

  list(query: I.TenantTransferListOptions = {}): Promise<I.List<I.Statement>> {
    return this.request('GET', this.resource, query);
  }

  retrieve(id: string): Promise<I.Statement> {
    return this.request('GET', `${this.resource}/${id}`);
  }

  statementUrls(id: string, query: I.StatementUrlOptions = {}): Promise<I.StatementUrl> {
    return this.request('POST', `${this.resource}/${id}/statement_urls`, query);
  }
}
