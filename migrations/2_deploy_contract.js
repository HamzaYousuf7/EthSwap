const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async (deployer) => {
  //token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  //ethswap
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  // transfering all the token to ethSwap
  await token.transfer(ethSwap.address, "1000000000000000000000000");
};
