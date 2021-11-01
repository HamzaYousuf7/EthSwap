const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = (deployer) => {
  //
  deployer.deploy(EthSwap);
  deployer.deploy(Token);
};
