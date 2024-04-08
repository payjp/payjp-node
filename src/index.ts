import Accounts from './account';
import Charges from './charge';
import Customers from './customer';
import Events from './event';
import Plans from './plan';
import Subscriptions from './subscription';
import Tenants from './tenants';
import TenantTransfers from './tenantTransfers';
import Tokens from './token';
import Transfers from './transfer';
import Statements from './statement';
import Terms from "./term";
import Balances from "./balance";

namespace Payjp {
  export interface PayjpStatic {
    (apikey: string, options?: PayjpOptions): Payjp;
  }

  export interface Payjp {
    apikey: string,
    config: PayjpOptions,
    charges: Charges,
    customers: Customers,
    plans: Plans,
    subscriptions: Subscriptions,
    tokens: Tokens,
    transfers: Transfers,
    events: Events,
    accounts: Accounts,
    tenants: Tenants,
    tenant_transfers: TenantTransfers,
    statements: Statements,
    terms: Terms,
    balances: Balances,
  }

  export interface PayjpOptions {
    timeout?: number,
    apibase?: string,
    maxRetry?: number,
    retryInitialDelay?: number,
    retryMaxDelay?: number,
  }

  export interface ListOptions {
    limit?: number,
    offset?: number,
    since?: number,
    until?: number,
  }

  export interface ChargeListOptions extends TransferChargeListOptions {
    subscription?: string,
    tenant?: string
  }

  export interface CustomerSubscriptionListOptions extends ListOptions {
    plan?: string,
    status?: "trial" | "active" | "canceled" | "paused",
  }

  export interface SubscriptionListOptions extends CustomerSubscriptionListOptions {
    customer?: string,
  }

  export interface EventListOptions extends ListOptions {
    resource_id?: string,
    object?: string,
    type?: string,
  }

  export interface TransferListOptions extends ListOptions {
    status?: "pending" | "paid" | "failed" | "stop" | "carried_over" | "recombination",
    since_scheduled_date?: number,
    until_scheduled_date?: number,
  }

  export interface TransferChargeListOptions extends ListOptions {
    customer?: string,
  }

  export interface TenantTransferListOptions extends TransferListOptions {
    transfer?: string,
    tenant?: string,
  }

  export interface StatementListOptions extends ListOptions {
    owner?: "merchant" | "tenant",
    source_transfer?: string,
    tenant?: string,
    term?: string,
    type?: "sales" | "service_fee" | "transfer_fee",
  }

  export interface TermListOptions extends ListOptions {
    since_start_at?: number,
    until_start_at?: number,
  }

  export interface BalanceListOptions extends ListOptions {
    since_due_date?: number,
    until_due_date?: number,
    state?: "collecting" | "transfer" | "claim",
    closed?: boolean,
    owner?: "merchant" | "tenant",
    tenant?: string,
  }

  interface OptionsMetadata {
    [x: string]: string | number;
  }

  interface WithMetadata {
    metadata?: OptionsMetadata;
  }

  export interface ChargeCreationOptions extends WithMetadata {
    amount?: number,
    currency?: "jpy",
    product?: string,
    customer?: string,
    card?: string,
    description?: string,
    capture?: boolean,
    expiry_days?: number,
    platform_fee?: number,
    tenant?: string,
    three_d_secure?: boolean,
  }

  export interface ChargeUpdateOptions extends WithMetadata {
    description?: string,
  }

  export interface ChargeReauthOptions {
    expiry_days?: number,
  }

  export interface ChargeCaptureOptions {
    amount?: number,
  }

  export interface RefundCreationOptions {
    amount?: number,
    refund_reason?: string,
  }

  export interface CustomerCreationOptions extends WithMetadata {
    email?: string,
    description?: string,
    id?: string,
    card?: string,
  }

  export interface CustomerUpdateOptions extends WithMetadata {
    email?: string,
    description?: string,
    default_card?: string,
    card?: string,
  }

  export interface PlanCreationOptions extends WithMetadata {
    amount: number,
    currency: "jpy",
    interval: "month" | "year",
    id?: string,
    name?: string,
    trial_days?: number,
    billing_day?: number,
  }

  export interface PlanUpdateOptions extends WithMetadata {
    name?: string,
  }

  export interface SubscriptionCreationOptions extends WithMetadata {
    customer: string,
    plan: string,
    trial_end?: number | "now",
    prorate?: boolean,
  }

  export interface SubscriptionUpdateOptions extends WithMetadata {
    trial_end?: number | "now",
    plan?: string,
    prorate?: boolean,
    next_cycle_plan?: string,
  }

  export interface SubscriptionResumeOptions {
    trial_end?: number | "now",
    prorate?: boolean,
  }

  export interface SubscriptionDeleteOptions {
    prorate?: boolean,
  }

  export interface TenantCreationOptions extends WithMetadata {
    name: string,
    id?: string,
    platform_fee_rate: string | number,
    payjp_fee_included?: boolean,
    minimum_transfer_amount?: number,
    bank_code?: string,
    bank_branch_code?: string,
    bank_account_type?: string,
    bank_account_number?: string,
    bank_account_holder_name?: string,
  }

  export interface TenantUpdateOptions extends WithMetadata {
    name?: string,
    platform_fee_rate?: string | number,
    minimum_transfer_amount?: number,
    bank_code?: string,
    bank_branch_code?: string,
    bank_account_type?: string,
    bank_account_number?: string,
    bank_account_holder_name?: string,
  }

  export interface StatementUrlOptions {
    platformer?: boolean,
  }

  export interface List<T> {
    object: "list",
    count: number,
    data: T[],
    has_more: boolean,
    url: string
  }

  export interface Charge {
    object: "charge",
    amount: number,
    amount_refunded: number,
    captured: boolean,
    captured_at: number | null,
    card: Card | null,
    created: number,
    currency: string,
    customer: string | null,
    description: string | null,
    expired_at: number | null,
    failure_code: string | null,
    failure_message: string | null,
    fee_rate: string | null,
    id: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    paid: boolean,
    refund_reason: string | null,
    refunded: boolean,
    subscription: string | null,
    platform_fee?: number | null,
    platform_fee_rate?: string | null,
    total_platform_fee?: number,
    tenant?: string | null,
    product?: any,
    three_d_secure_status: string | null,
    term_id: string | null,
  }

  export interface Customer {
    object: "customer",
    cards: List<Card>,
    created: number,
    default_card: string | null,
    description: string,
    email: string | null,
    id: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    subscriptions: List<Subscription>,
  }

  export interface Card {
    object: "card",
    address_city: string | null,
    address_line1: string | null,
    address_line2: string | null,
    address_state: string | null,
    address_zip: string | null,
    address_zip_check: string,
    brand: string,
    country: string | null,
    created: number,
    customer: string | null,
    cvc_check: string,
    exp_month: number,
    exp_year: number,
    fingerprint: string,
    id: string,
    last4: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    name: string | null,
    three_d_secure_status: string | null,
  }

  export interface Plan {
    object: "plan",
    amount: number;
    billing_day: number | null;
    created: number;
    currency: string;
    id: string;
    interval: string;
    livemode: boolean;
    metadata: OptionsMetadata | null;
    name: string | null;
    trial_days: number;
  }

  export interface Subscription {
    object: "subscription",
    canceled_at: number | null,
    created: number,
    current_period_end: number,
    current_period_start: number,
    customer: string,
    id: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    next_cycle_plan: Plan | null,
    paused_at: number | null,
    plan: Plan,
    prorate: boolean,
    resumed_at: number | null,
    start: number,
    status: string,
    trial_end: number | null,
    trial_start: number | null,
  }

  export interface Token {
    object: "token",
    card: Card,
    created: number,
    id: string,
    livemode: boolean,
    used: boolean,
  }

  interface Summary {
    charge_count: number,
    charge_fee: number,
    charge_gross: number,
    net: number,
    refund_amount: number,
    refund_count: number,
    dispute_amount: number,
    dispute_count: number,
  }

  interface TransferBase {
    object: string,
    amount: number,
    carried_balance: number | null,
    charges: List<Charge>,
    created: number,
    currency: "jpy",
    id: string,
    livemode: boolean,
    scheduled_date: string,
    status: string,
    summary: Summary,
    term_end: number,
    term_start: number,
    transfer_amount: number | null,
    transfer_date: string | null,
  }

  export interface Transfer extends TransferBase {
    object: "transfer",
    description: string | null,
  }

  export interface Event {
    object: "event",
    livemode: boolean,
    id: string,
    data: Charge | Customer | Card | Plan | Subscription | Token | Transfer | Tenant | TenantTransfer,
    pending_webhooks: number,
    created: number,
    type: string,
  }

  export interface Account {
    object: "account",
    created: number,
    email: string,
    id: string,
    merchant: Merchant,
    team_id: string,
  }

  export interface Merchant {
    object: "merchant",
    bank_enabled: boolean,
    brands_accepted: string[],
    business_type: string | null,
    charge_type: string[] | null,
    country: string | null,
    created: number,
    currencies_supported: string[],
    default_currency: string,
    details_submitted: boolean,
    id: string,
    livemode_activated_at: number | null,
    livemode_enabled: boolean,
    product_name: string | null,
    product_type: string[] | null,
    site_published: boolean | null,
  }

  export interface Tenant {
    created: number,
    name: string,
    id: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    object: "tenant",
    platform_fee_rate: string,
    minimum_transfer_amount: number,
    bank_account_number: string,
    bank_branch_code: string,
    bank_code: string,
    bank_account_holder_name: string,
    bank_account_type: string,
    bank_account_status: string,
    currencies_supported: string[],
    default_currency: "jpy",
    payjp_fee_included: boolean,
    reviewed_brands: ReviewedBrand[],
  }

  export interface Statement {
    created: number,
    id: string,
    livemode: boolean,
    object: "statement",
    title: string,
    tenant_id: string,
    type: "sales" | "service_fee" | "transfer_fee",
    net: number,
    term: Term | null,
    balance_id: string,
    items: StatementItems[],
    updated: number,
  }

  export interface StatementItems {
    subject: "gross_sales" | "fee" | "platform_fee" | "gross_refund" | "refund_fee_offset" |
      "refund_platform_fee_offset" | "chargeback" | "chargeback_fee_offset" | "chargeback_platform_fee_offset" |
      "proplan" | "transfer_fee",
    amount: number,
    name: string,
    tax_rate: string,
  }

  export interface StatementUrl {
    object: "statement_url",
    url: string,
    expires: number,
  }

  interface ReviewedBrand {
    brand: string,
    status: string,
    available_date: number | null,
  }

  export interface ApplicationUrl {
    object: "application_url",
    url: string,
    expires: number,
  }

  export interface TenantTransfer extends TransferBase {
    object: "tenant_transfer",
    tenant_id: string,
    summary: TenantTransferSummary,
  }

  interface TenantTransferSummary extends Summary {
    total_platform_fee: number,
  }

  export interface Term {
    id: string,
    livemode: boolean,
    object: "term",
    charge_count: number,
    refund_count: number,
    dispute_count: number,
    end_at: number,
    start_at: number,
  }

  export interface BankInfo {
    bank_code: string;
    bank_branch_code: string;
    bank_account_type: string;
    bank_account_number: string;
    bank_account_holder_name: string;
    bank_account_status: "success" | "failed" | "pending";
  }

  export interface Balance {
    created: number,
    id: string,
    livemode: boolean,
    net: number,
    object: "balance",
    state: "collecting" | "transfer" | "claim",
    statements: Statement[],
    closed: boolean,
    due_date: null | number,
    tenant_id: string,
    bank_info: null | BankInfo
  }

  export interface Deleted {
    deleted: boolean,
    id: string,
    livemode: boolean,
  }

  export interface PayjpError {
    error: {
      message: string,
      type: string,
      status: number,
      code?: string,
      param?: string,
      charge?: string,
    }
  }

  export interface ResponseError {
    status?: number | undefined,
    response?: { body?: PayjpError, [propName: string]: any } | undefined,
    message: string,
    timeout?: number,

    [propName: string]: any,
  }
}

const Payjp: Payjp.PayjpStatic = function (apikey: string, options: Payjp.PayjpOptions = {}): Payjp.Payjp {
  if (!apikey) {
    throw new Error('Please set apikey.');
  } else if (apikey.indexOf('pk_') === 0) {
    throw new Error('You cannot use the public apikey in this SDK.');
  }

  const payjpConfig = {
    apikey,
    config: {
      apibase: options.apibase || 'https://api.pay.jp/v1',
      timeout: options.timeout || 0,
      maxRetry: options.maxRetry || 0,
      retryInitialDelay: options.retryInitialDelay || 2000,
      retryMaxDelay: options.retryMaxDelay || 32000,
    },
  };
  return {
    apikey,
    // todo not using spread operator for Node.js v6 support
    config: payjpConfig.config,
    charges: new Charges(payjpConfig),
    customers: new Customers(payjpConfig),
    plans: new Plans(payjpConfig),
    subscriptions: new Subscriptions(payjpConfig),
    tokens: new Tokens(payjpConfig),
    transfers: new Transfers(payjpConfig),
    events: new Events(payjpConfig),
    accounts: new Accounts(payjpConfig),
    tenants: new Tenants(payjpConfig),
    'tenant_transfers': new TenantTransfers(payjpConfig),
    statements: new Statements(payjpConfig),
    terms: new Terms(payjpConfig),
    balances: new Balances(payjpConfig),
  };
}

export = Payjp;
