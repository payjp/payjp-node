# PAY.JP for Node.js

[![Build Status](https://travis-ci.org/payjp/payjp-node.svg?branch=master)](https://travis-ci.org/payjp/payjp-node)
[![npm](https://img.shields.io/npm/v/payjp.svg)](payjp)

## Installation

```
npm install --save payjp
```

## Dependencies

- [superagent](https://visionmedia.github.io/superagent/)

## Documentation

* [API Documentation](https://pay.jp/docs/api/?javascript)

### Example

In advance, you need to get a token by [Checkout](https://pay.jp/docs/checkout) or [payjp.js](https://pay.jp/docs/payjs).

Javascript

```js
const payjp = require('payjp')('sk_test_c62fade9d045b54cd76d7036');
payjp.charges.create({
  amount: 1000,
  currency: 'jpy',
  card: 'token_id_by_Checkout_or_payjp.js'
}).then(console.log).catch(console.error);
```

Typescript

```js
import * as Payjp from 'payjp';
const payjp = Payjp('sk_test_c62fade9d045b54cd76d7036');
payjp.charges.create({
  amount: 1000,
  currency: 'jpy',
  card: 'token_id_by_Checkout_or_payjp.js'
}).then((charge: Payjp.Charge) => console.log(charge)
).catch((e: Payjp.ResponseError) => console.error(e.response.body as Payjp.PayjpError));
```

### Options

Options can be specified in the constructor.

#### Timeout

Timeout is configurable for the entire request (including all uploads, redirects, server processing time) to complete.
If the response isn't fully downloaded within that time, the request will be aborted.

```js
const payjp = require('payjp')('sk_...', {timeout: 20 * 1000}); // in ms (this is 20 seconds)
```
