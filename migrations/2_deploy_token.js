var FungibleToken = artifacts.require("./Token.sol");

module.exports = function (deployer) {
  deployer.deploy(FungibleToken, "DevToken", "DEV", 18, 10000);
};
