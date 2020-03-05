var WillWorkForDai = artifacts.require("./WillWorkForDai.sol");

module.exports = function(deployer,network,accounts) {
  deployer.deploy(WillWorkForDai,"Sample Project","This project is designed for testing.",accounts[1],{from: accounts[0]});
};