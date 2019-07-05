/* global Buffer */

import assert from 'power-assert';
import http from 'http';
import Requestor from '../built/requestor';

describe('HTTP Requestor', () => {

  var _requestor;

  before(() => {
    _requestor = new Requestor('apikey', 'https://api.pay.jp/v999');
  });

  describe('buildHeader', () => {

    const encodedKey = Buffer.from(`${'apikey'}:`).toString('base64');

    it('GET', () => {
      let header = _requestor.buildHeader('GET');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === undefined);
    });

    it('POST', () => {
      let header = _requestor.buildHeader('POST');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === 'application/x-www-form-urlencoded');
    });

    it('DELETE', () => {
      let header = _requestor.buildHeader('DELETE');
      assert(header['Accept'] === 'application/json');
      assert(header['Authorization'] === `Basic ${encodedKey}`);
      assert(header['Content-Type'] === undefined);
    });
  });

  describe('buildUrl', () => {
    it('return correct endpoint', () => {
      let url = _requestor.buildUrl('charges');
      assert(url === 'https://api.pay.jp/v999/charges');
    });
  });

  describe('request', () => {
    it('return 200 by POST', (done) => {
      const method = 'POST';
      const dummy = {object: 'payjp'};
      const apikey = 'apikey';
      const encodedKey = Buffer.from(`${apikey}:`).toString('base64');
      const status = 200;
      const server = http.createServer((msg, res) => {
        assert(!!msg.headers.host);
        assert.strictEqual(msg.headers['accept-encoding'], 'gzip, deflate');
        assert.strictEqual(msg.headers['user-agent'].indexOf('node-superagent/'), 0);
        assert.strictEqual(msg.headers['content-type'], 'application/x-www-form-urlencoded');
        assert(parseInt(msg.headers['content-length'], 10) > 0);
        assert.strictEqual(msg.headers.accept, 'application/json');
        assert.strictEqual(msg.headers.authorization, 'Basic ' + encodedKey);
        assert.strictEqual(msg.headers.connection, 'close');
        assert.strictEqual(msg.method, method);
        assert.strictEqual(msg.url, '/v1/test');
        let rawData = '';
        msg.on('data', (chunk) => { rawData += chunk; });
        msg.on('end', () => {
          assert.strictEqual(rawData, 'object=payjp');
          const body = JSON.stringify(dummy);
          res.writeHead(status, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json',
          });
          res.end(body);
        });
      }).listen(() => {
        const apibase = `http://localhost:${server.address().port}/v1`;
        const requestor = new Requestor(apikey, apibase, {cert: null});
        requestor.request(method, 'test', dummy).then((r) => {
          assert.deepStrictEqual(r, dummy);
          server.close();
          done();
        });
      });
    });
    it('return 404 by GET', (done) => {
      const method = 'GET';
      const dummy = {object: 'payjp'};
      const apikey = 'apikey';
      const encodedKey = Buffer.from(`${apikey}:`).toString('base64');
      const status = 404;
      const server = http.createServer((msg, res) => {
        assert(!!msg.headers.host);
        assert.strictEqual(msg.headers['accept-encoding'], 'gzip, deflate');
        assert.strictEqual(msg.headers['user-agent'].indexOf('node-superagent/'), 0);
        assert.strictEqual(msg.headers.accept, 'application/json');
        assert.strictEqual(msg.headers.authorization, 'Basic ' + encodedKey);
        assert.strictEqual(msg.headers.connection, 'close');
        assert.strictEqual(msg.method, method);
        assert.strictEqual(msg.url, '/v1/notfound?object=payjp');
        const body = JSON.stringify({error: {
          message: 'test',
          status,
          type: 'not_found_error',
        }});
        res.writeHead(status, {
          'Content-Length': Buffer.byteLength(body),
          'Content-Type': 'application/json',
        });
        res.end(body);
      }).listen(() => {
        const apibase = `http://localhost:${server.address().port}/v1`;
        const requestor = new Requestor(apikey, apibase, {cert: null});
        requestor.request(method, 'notfound', dummy).catch((e) => {
          assert.strictEqual(e.status, status);
          assert.strictEqual(e.response.body.error.message, 'test');
          assert.strictEqual(e.response.body.error.status, status);
          assert.strictEqual(e.response.body.error.type, 'not_found_error');
          server.close();
          done();
        });
      });
    });
    it('return 200 by DELETE, but invalid response', (done) => {
      const method = 'DELETE';
      const apikey = 'apikey';
      const encodedKey = Buffer.from(`${apikey}:`).toString('base64');
      const status = 200;
      const server = http.createServer((msg, res) => {
        assert(!!msg.headers.host);
        assert.strictEqual(msg.headers['accept-encoding'], 'gzip, deflate');
        assert.strictEqual(msg.headers['user-agent'].indexOf('node-superagent/'), 0);
        assert.strictEqual(msg.headers.accept, 'application/json');
        assert.strictEqual(msg.headers.authorization, 'Basic ' + encodedKey);
        assert.strictEqual(msg.headers.connection, 'close');
        assert.strictEqual(msg.method, method);
        assert.strictEqual(msg.url, '/v1/test');
        res.writeHead(status, {'Content-Type': 'text/plain'});
        res.end('<html></html>');
      }).listen(() => {
        const apibase = `http://localhost:${server.address().port}/v1`;
        const requestor = new Requestor(apikey, apibase, {cert: null});
        requestor.request(method, 'test').catch((e) => {
          assert.deepStrictEqual(e, {
            message: 'Invalid response',
            status,
            response: '<html></html>',
          });
          server.close();
          done();
        });
      });
    });
    it('return Network Error: request ok, but not response', (done) => {
      const server = http.createServer((msg, res) => {
        assert(!!msg.headers.host);
        return msg.socket.destroy();
      }).listen(() => {
        const apibase = `http://localhost:${server.address().port}/v1`;
        const requestor = new Requestor('', apibase, {cert: null});
        requestor.request('GET', '').catch((r) => {
          assert.strictEqual(r.status, undefined);
          assert.strictEqual(r.response, undefined);
          assert.strictEqual(r.message, 'socket hang up');
          done();
        });
      });
    });
    it('return Network Error: url not exists', (done) => {
      const server = http.createServer();
      server.listen(() => {
        const apibase = `http://localhost:${server.address().port}/v1`;
        server.close();
        const requestor = new Requestor('', apibase, {cert: null});
        requestor.request('GET', '').catch((r) => {
          assert.strictEqual(r.status, undefined);
          assert.strictEqual(r.response, undefined);
          assert.strictEqual(r.message.indexOf('connect ECONNREFUSED'), 0);
          done();
        });
      });
    });
  });

});
