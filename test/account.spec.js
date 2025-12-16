const assert = require("node:assert");
const Payjp = require("../built");
const config = require("./config");

const payjp = Payjp(config.apikey, config);
payjp.accounts.request = (...args) => Promise.resolve(args);

describe("Accounts Resource", () => {
  describe("retrieve", () => {
    it("Sends the correct request", () => {
      return payjp.accounts.retrieve().then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "accounts");
      });
    });
  });
});
