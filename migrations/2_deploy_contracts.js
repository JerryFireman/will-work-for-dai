var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer,network,accounts) {
  deployer.deploy(SimpleStorage,"Sample Project","This project is designed for testing.",accounts[1],{from: accounts[0]});
};