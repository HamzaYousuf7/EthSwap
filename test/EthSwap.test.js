const { assert } = require("chai");

// imp
const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

// congif
require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("EthSwap", async ([deployer, investor]) => {
  // refactoring
  let token, ethSwap;
  before(async () => {
    //deploying
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);

    // trasnfering
    await token.transfer(ethSwap.address, tokens("1000000"));
  });

  describe("EthSwap Deployment", async () => {
    it("contract has a name", async () => {
      let name = await ethSwap.name();
      assert.equal(name, "EthSwap Exchange");
    });
  });

  describe("Token Deployment", async () => {
    it("Token has a name", async () => {
      let name = await token.name();
      assert.equal(name, "Alpha Token");
    });
  });

  describe("EthSwap has all token", async () => {
    it("EthSwap have all tokens", async () => {
      let balance = await token.balanceOf(ethSwap.address);

      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("BuyToken()", async () => {
    it("Buying 100 token ", async () => {
      let result = await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
    });

    it("Investor Recevie token or not", async () => {
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));
    });

    it("EthSwap token decrease after purchase ", async () => {
      // checking swap banalnce
      let ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens("999900"));
    });
  });
});
