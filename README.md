# PAY.JP for Node.js

[![Build Status](https://github.com/payjp/payjp-node/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/payjp/payjp-node/actions)
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

#### Retry

You can automatically retry the request when the client received HTTP 429 response caused by [Rate Limit](https://pay.jp/docs/api/#rate-limit).
By default, the retry feature is disabled. To activate, set `maxRetry` for 1 or more.

```js
const payjp = new Payjp('sk_live_xxx', {maxRetry: 5, retryInitialDelay: 1000, retryMaxDelay: 20 * 1000})
```

A delay of retry is calculated based on [Exponential backoff with equal jitter](https://aws.amazon.com/jp/blogs/architecture/exponential-backoff-and-jitter/) algorithm.
Each delay is randomly choiced between "`retryInitialDelay` * 2 ** `retryCount`" and "`retryInitialDelay` * 2 ** `retryCount` / 2" but doesn't exceed `retryMaxDelay`.