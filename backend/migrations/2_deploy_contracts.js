const UniToken = artifacts.require("UniToken");
const UniMarketplace = artifacts.require("UniMarketplace");

module.exports = async function (deployer) {
  await deployer.deploy(UniToken);

  const token = await UniToken.deployed();

  // Pass UniToken address into UniMarketplace constructor
  await deployer.deploy(UniMarketplace, token.address);
};
