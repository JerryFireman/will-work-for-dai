var ProjectAgreements = artifacts.require("./ProjectAgreements.sol");

module.exports = function(deployer,network,accounts) {
  deployer.deploy(ProjectAgreements,"Sample Project","This project is designed for testing.",accounts[1],{from: accounts[0]});
};