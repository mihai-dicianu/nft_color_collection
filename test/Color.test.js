const { assert } = require("chai");

const Color = artifacts.require("./Color.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Color", (accounts) => {
  let contract;

  before(async () => {
    contract = await Color.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      console.log(address);
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Color");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "COLOR");
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await contract.mint("0xABCDE0");
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      //success
      assert.equal(event.from, "0x0000000000000000000000000000000000000000");
      assert.equal(event.to, accounts[0]);
      assert.equal(event.tokenId.toNumber(), "1", "id is correct");
      //failure
      await contract.mint("0xABCDE0").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists colors", async () => {
      //mint 3 tokens
      await contract.mint("0xFFFFFF");
      await contract.mint("0x000000");
      await contract.mint("0xAAAAAA");
      const totalSupply = await contract.totalSupply();
      let color;
      let result = [];
      for (var i = 1; i <= totalSupply; i++) {
        color = await contract.colors(i - 1);
        result.push(color);
      }

      let expected = ["0xABCDE0", "0xFFFFFF", "0x000000", "0xAAAAAA"];

      assert.equal(result.join(","), expected.join(","));
    });
  });
});
