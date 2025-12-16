const assert = require("node:assert");
const Payjp = require("../built");
const config = require("./config");

const payjp = Payjp(config.apikey, config);
payjp.transfers.request = (...args) => Promise.resolve(args);

describe("Transfer Resource", () => {
  describe("list", () => {
    it("Sends the correct request", () => {
      return payjp.transfers.list().then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "transfers");
      });
    });
  });

  describe("retrieve", () => {
    it("Sends the correct request", () => {
      return payjp.transfers.retrieve("id123").then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "transfers/id123");
      });
    });
  });

  describe("charges", () => {
    it("Sends the correct request", () => {
      return payjp.transfers.charges("id123").then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "transfers/id123/charges");
      });
    });
  });
});
