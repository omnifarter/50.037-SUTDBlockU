const UniToken = artifacts.require("UniToken");
const UniMarketplace = artifacts.require("UniMarketplace");

module.exports = async function (deployer) {
  await deployer.deploy(UniToken);

  const token = await UniToken.deployed();
  console.log("This is the UniToken contract address: " + token.address)
  // Pass UniToken address into UniMarketplace constructor
  await deployer.deploy(UniMarketplace, token.address);
  const marketplace = await UniMarketplace.deployed() 
  console.log("This is the UniMarketplace contract address: " + token.address)
};
