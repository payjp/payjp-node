# PAY.JP for Node.js

[![Build Status](https://travis-ci.org/payjp/payjp-node.svg?branch=master)](https://travis-ci.org/payjp/payjp-node)
[![npm](https://img.shields.io/npm/v/payjp.svg)](payjp)

## Installation

```
npm install --save payjp
```

## Dependencies

- superagent

## Documentation

* [API Documentation](https://pay.jp/docs/api/)

### Example

```js
const payjp = require('payjp')('sk_test_c62fade9d045b54cd76d7036');
Promise.resolve(payjp.customers.list()).then((r) => {
  console.log(r);
});
```

#### Options

Options can be specified in the constructor.

* Cert

You can specify the certificate to be used for the request.

```js
const options = {
  cert: 'path/to/ca-certificates.crt'
}
const payjp = require('payjp')('sk_...', options);
```

### Charge

```js
payjp.charges.retrieve(id)
payjp.charges.create(query = {})
payjp.charges.update(id, query = {})
payjp.charges.list(query = {})
payjp.charges.capture(id, query = {})
payjp.charges.refund(id, query ={})
```

### Customer

```js
payjp.customers.retrieve(id)
payjp.customers.create(query = {})
payjp.customers.update(id, query = {})
payjp.customers.delete(id)
payjp.customers.list(query = {})
```

### Card

```js
payjp.customers.cards.retrieve(customer_id, card_id)
payjp.customers.cards.create(customer_id, query = {})
payjp.customers.cards.update(customer_id, card_id, query = {})
payjp.customers.cards.delete(customer_id, card_id)
payjp.customers.cards.list(customer_id, query = {})
```

### Plan

```js
payjp.plans.retrieve(id)
payjp.plans.create(query = {})
payjp.plans.update(id, query = {})
payjp.plans.delete(id)
payjp.plans.list(query = {})
```

### Subscription

```js
payjp.subscriptions.retrieve(id)
payjp.subscriptions.create(query = {})
payjp.subscriptions.update(id, query = {})
payjp.subscriptions.delete(id)
payjp.subscriptions.list(query = {})
payjp.subscriptions.pause(id)
payjp.subscriptions.resume(id, query = {})
payjp.subscriptions.cancel(id)
payjp.subscriptions.delete(id)
payjp.customers.subscriptions.list(customer_id, query = {})
payjp.customers.subscriptions.retrieve(customer_id, subscription_id)
```

### Token

```js
payjp.tokens.create(query = {})
payjp.tokens.retrieve(id)
```

### Transfer

```js
payjp.transfers.list(query = {})
payjp.transfers.retrieve(id)
payjp.transfers.charges(id, query = {})
```

### Event

```js
payjp.events.retrieve(id)
payjp.events.list(query = {})
```

### Account

```js
payjp.accounts.retrieve()
```
