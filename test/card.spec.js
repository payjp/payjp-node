const assert = require("node:assert");
const Payjp = require("../built");
const config = require("./config");

const payjp = Payjp(config.apikey, config);
payjp.customers.cards.request = (...args) => Promise.resolve(args);

describe("Cards Resource", () => {
  describe("create", () => {
    it("Sends the correct request", () => {
      return payjp.customers.cards.create("cus_id123", {}).then(([_method, _endpoint]) => {
        assert(_method === "POST");
        assert(_endpoint === "customers/cus_id123/cards");
      });
    });
  });

  describe("list", () => {
    it("Sends the correct request", () => {
      return payjp.customers.cards.list("cus_id123").then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "customers/cus_id123/cards");
      });
    });
  });

  describe("retrieve", () => {
    it("Sends the correct request", () => {
      return payjp.customers.cards.retrieve("cus_id123", "id456").then(([_method, _endpoint]) => {
        assert(_method === "GET");
        assert(_endpoint === "customers/cus_id123/cards/id456");
      });
    });
  });

  describe("update", () => {
    it("Sends the correct request", () => {
      return payjp.customers.cards.update("cus_id123", "id456", {}).then(([_method, _endpoint]) => {
        assert(_method === "POST");
        assert(_endpoint === "customers/cus_id123/cards/id456");
      });
    });
  });

  describe("delete", () => {
    it("Sends the correct request", () => {
      return payjp.customers.cards.delete("cus_id123", "id456").then(([_method, _endpoint]) => {
        assert(_method === "DELETE");
        assert(_endpoint === "customers/cus_id123/cards/id456");
      });
    });
  });
});
