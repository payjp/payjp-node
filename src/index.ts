import Charges from './charge';
import Customers from './customer';
import Plans from './plan';
import Subscriptions from './subscription';
import Tokens from './token';
import Transfers from './transfer';
import Events from './event';
import Accounts from './account';

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
  }

  export interface PayjpOptions {
    timeout?: number,
    apibase?: string,
  }

  export interface ListOptions {
    limit?: number,
    offset?: number,
    since?: number,
    until?: number,
  }

  export interface ChargeListOptions extends TransferChargeListOptions {
    subscription?: string,
  }

  export interface CustomerSubscriptionListOptions extends ListOptions {
    plan?: string,
    status?: "trial" | "active" | "canceled" | "paused",
  }

  export interface SubscriptionListOptions extends CustomerSubscriptionListOptions {
    customer?: string,
  }

  export interface TransferListOptions extends ListOptions {
    status?: "pending" | "paid" | "failed" | "stop" | "carried_over",
  }

  export interface PayjpEventListRequest extends ListOptions {
    resource_id?: string,
    object?: string,
    type?: string,
  }

  export interface TransferChargeListOptions extends ListOptions {
    customer?: string,
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
    captured: true,
    captured_at: number | null,
    card: Card | null,
    created: number,
    currency: string,
    customer: string | null,
    description: string | null,
    expired_at: number | null,
    failure_code: string | null,
    failure_message: string | null,
    id: string,
    livemode: boolean,
    metadata: OptionsMetadata | null,
    paid: boolean,
    refund_reason: string | null,
    refunded: boolean,
    subscription: string | null,
    platform_fee: number | null,
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
    id: string;
    livemode: boolean;
    used: boolean;
  }

  export interface Transfer {
    object: "transfer",
    amount: number,
    carried_balance: number | null,
    charges: List<Charge>,
    created: number,
    currency: string,
    description: string | null,
    id: string,
    livemode: boolean,
    scheduled_date: string,
    status: string,
    summary: {
      charge_count: number,
      charge_fee: number,
      charge_gross: number,
      net: number,
      refund_amount: number,
      refund_count: number
    },
    term_end: number,
    term_start: number,
    transfer_amount: number | null,
    transfer_date: number | null,
  }

  export interface Event {
    object: "event",
    livemode: boolean,
    id: string,
    data: Charge | Customer | Card | Plan | Subscription | Token | Transfer,
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
    response?: {body?: PayjpError, [propName: string]: any} | undefined,
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
  };
}

export = Payjp;
