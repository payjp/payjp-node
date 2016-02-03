# PAY.JP for Node.js

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
var payjp = require('payjp');
var client = new payjp('sk_test_c62fade9d045b54cd76d7036');
Promise.resolve(client.customers.list()).then((r) => {
  console.log(r);
});
```

### Charge

```js
client.charges.retrieve(id)
client.charges.create(query = {})
client.charges.update(id, query = {})
client.charges.list(query = {})
client.charges.capture(id, query = {})
client.charges.refund(id, query ={})
```

### Customer

```js
client.customers.retrieve(id)
client.customers.create(query = {})
client.customers.update(id, query = {})
client.customers.delete(id)
client.customers.list(query = {})
```

### Card

```js
client.customers.cards.retrieve(customer_id, card_id)
client.customers.cards.create(customer_id, query = {})
client.customers.cards.update(customer_id, card_id, query = {})
client.customers.cards.delete(customer_id, card_id)
client.customers.cards.list(customer_id, query = {})
```

### Plan

```js
client.plans.retrieve(id)
client.plans.create(query = {})
client.plans.update(id, query = {})
client.plans.delete(id)
client.plans.list(query = {})
```

### Subscription

```js
client.subscriptions.retrieve(id)
client.subscriptions.create(query = {})
client.subscriptions.update(id, query = {})
client.subscriptions.delete(id)
client.subscriptions.list(query = {})
client.subscriptions.pause(id)
client.subscriptions.resume(id, query = {})
client.subscriptions.cancel(id)
client.subscriptions.delete(id)
client.customers.subscriptions.list(customer_id, query = {})
client.customers.subscriptions.retrieve(customer_id, subscription_id)
```

### Token

```js
client.tokens.create(query = {})
client.tokens.retrieve(id)
```

### Token

```js
client.transfers.list(query = {})
client.transfers.retrieve(id)
client.transfers.charges(id, query = {})
```

### Event

```js
client.events.retrieve(customer_id, card_id)
client.events.list(customer_id, query = {})
```

### Account

```js
client.accounts.retrieve()
```
