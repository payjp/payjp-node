const assert = require("node:assert");
const Payjp = require("../built");
const config = require("./config");

const payjp = Payjp(config.apikey, config);
payjp.terms.request = (...args) => Promise.resolve(args);

describe("Term Resource", () => {
  describe("list", () => {
    it("Sends the correct request", () => {
      const query = { limit: 1 };
      return payjp.terms.list(query).then(([_method, _endpoint, _query]) => {
        assert(_method === "GET");
        assert(_endpoint === "terms");
        assert.deepStrictEqual(_query, query);
      });
    });
  });

  describe("retrieve", () => {
    it("Sends the correct request", () => {
      return payjp.terms.retrieve("id123").then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "terms/id123");
      });
    });
  });
});
