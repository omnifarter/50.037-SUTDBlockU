const UniToken = artifacts.require("UniToken");

module.exports = async function (deployer) {
  await deployer.deploy(UniToken);

  const token = await UniToken.deployed();
  console.log("This is the UniToken contract address: " + token.address);
};
