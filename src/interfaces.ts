export interface CustomerResponse {
  cards: {
    count: number,
    data: CardResponse[],
    has_more: boolean,
    object: string,
    url: string
  },
  created: number,
  default_card: string | null,
  description: string,
  email: string | null,
  id: string,
  livemode: boolean,
  metadata: object,
  object: string,
  subscriptions: {
    count: number,
    data: SubscriptionResponse[],
    has_more: boolean,
    object: string,
    url: string
  }
}

export interface CustomerDeleted {
  deleted: boolean,
  id: string,
  livemode: boolean,
}

export interface PlanResponse {
  amount: number;
  billing_day: number | null;
  created: number;
  currency: string;
  id: string;
  interval: string;
  livemode: boolean;
  metadata: object;
  name: string | null;
  object: string;
  trial_days: number;
}

export interface PlanDeleted {
  deleted: boolean;
  id: string;
  livemode: boolean;
}

export interface SubscriptionResponse {
  canceled_at: number | null,
  created: number,
  current_period_end: number,
  current_period_start: number,
  customer: string,
  id: string,
  livemode: boolean,
  metadata: object,
  object: string,
  paused_at: number | null,
  plan: PlanResponse
  resumed_at: number | null,
  start: number,
  status: string,
  trial_end: number | null,
  trial_start: number | null,
  prorate: boolean
}

export interface SubscriptionDeleted {
  deleted: boolean,
  id: string,
  livemode: boolean
}

export interface TransferResponse {
  amount: number,
  carried_balance: number | null,
  charges: {
    count: number,
    data: ChargeResponse[],
    has_more: boolean,
    object: string,
    url: string
  },
  created: number,
  currency: string,
  description: string | null,
  id: string,
  livemode: boolean,
  object: string,
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
  transfer_date: number | null
}

export interface TokenResponse {
  id: string;
  livemode: boolean;
  object: string;
  used: boolean;
  card: CardResponse,
}

export interface EventResponse {
  created: number,
  data: {
    cards: {
      count: number,
      data: CardResponse[],
      has_more: boolean,
      object: string,
      url: string
    },
    created: number,
    default_card: string | null,
    description: string,
    email: string | null,
    id: string,
    livemode: boolean,
    object: string,
    subscriptions: {
      count: number,
      data: SubscriptionResponse[],
      has_more: boolean,
      object: string,
      url: string
    }
  },
  id: string,
  livemode: boolean,
  object: string,
  pending_webhooks: number,
  type: string
}

export interface CardResponse {
  address_city: string | null,
  address_line1: string | null,
  address_line2: string | null,
  address_state: string | null,
  address_zip: string | null,
  address_zip_check: string,
  brand: string,
  country: string | null,
  created: number,
  customer: null,
  cvc_check: string,
  exp_month: number,
  exp_year: number,
  fingerprint: string,
  id: string,
  last4: string,
  livemode: boolean,
  metadata: object,
  name: string,
  object: string
}

export interface CardDeleted {
  deleted: boolean,
  id: string,
  livemode: boolean
}

export interface AccountResponse {
  created: number,
  email: string,
  id: string,
  merchant: {
    bank_enabled: boolean,
    brands_accepted: string[],
    business_type: string | null,
    charge_type: string[] | null,
    contact_phone: string | null,
    country: string,
    created: number,
    currencies_supported: string[],
    default_currency: string,
    details_submitted: boolean,
    id: string,
    livemode_activated_at: number | null,
    livemode_enabled: boolean,
    object: string,
    product_detail: string,
    product_name: string,
    product_type: string[],
    site_published: boolean,
    url: string | null
  },
  object: string
}

export interface ChargeResponse {
  amount: number,
  amount_refunded: number,
  captured: true,
  captured_at: number | null,
  card: CardResponse,
  created: number,
  currency: string,
  customer: string | null,
  description: string | null,
  expired_at: number | null,
  failure_code: string | null,
  failure_message: string | null,
  id: string,
  livemode: boolean,
  metadata: object,
  object: string,
  paid: boolean,
  refund_reason: string | null,
  refunded: boolean,
  subscription: SubscriptionResponse | null
}
