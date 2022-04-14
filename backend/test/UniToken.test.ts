import { assert, expect, use } from "chai";
import { Contract, utils } from "ethers";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";
import UniToken from "../build/contracts/UniToken.json";

use(solidity);

const TEST_NFT = {
  name: "Covid-19 Ain't Cool",
  description:
    "Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.",
  imageUrl:
    "https://ipfs.infura.io/ipfs/QmQpQgkzxnEgMt7MYgtBJg1pzGRxT7sBhyR2LASZFi7bwi",
  imageHash: "0dd954732b26312eb4e10b1b9f21bb3b8d9b1a422c910e8942521e75b86ec65c",
};
describe("UniToken test cases", () => {
  const [sender] = new MockProvider().getWallets();
  let token: Contract;

  beforeEach(async () => {
    // @ts-ignore
    token = await deployContract(sender, UniToken);
  });

  it("Mint NFT", async () => {
    const createdAt = new Date().toString();
    await expect(
      token.mint(
        TEST_NFT.name,
        TEST_NFT.description,
        TEST_NFT.imageUrl,
        TEST_NFT.imageHash,
        createdAt
      )
    )
      .to.emit(token, "Minted")
      .withArgs(0, "Covid-19 Ain't Cool", createdAt);

    const numTokens = await token.getNumTokens();

    expect(numTokens).to.be.equal(1);

    const owner = await token.ownerOf(0);

    expect(owner).to.be.equal(sender.address);
  });

  it("Minting the same NFT should fail", async () => {
    const createdAt = new Date().toString();
    await expect(
      token.mint(
        TEST_NFT.name,
        TEST_NFT.description,
        TEST_NFT.imageUrl,
        TEST_NFT.imageHash,
        createdAt
      )
    )
      .to.emit(token, "Minted")
      .withArgs(0, "Covid-19 Ain't Cool", createdAt);

    await expect(
      token.mint(
        "Covid-19 Is Cool",
        TEST_NFT.description,
        TEST_NFT.imageUrl,
        TEST_NFT.imageHash,
        createdAt
      )
    ).to.be.revertedWith("NFT already exists.");
  });

  it("Listing NFT", async () => {
    const createdAt = new Date().toString();
    await expect(
      token.mint(
        TEST_NFT.name,
        TEST_NFT.description,
        TEST_NFT.imageUrl,
        TEST_NFT.imageHash,
        createdAt
      )
    )
      .to.emit(token, "Minted")
      .withArgs(0, "Covid-19 Ain't Cool", createdAt);

    await expect(token.list(0, utils.parseEther("0.5"))).to.emit(
      token,
      "ItemListedSuccessfully"
    );

    const tokenData = await token.getTokenData(0);

    expect(tokenData.listed).to.be.true;
  });

  it("Buying NFT", async () => {
    const createdAt = new Date().toString();
    await expect(
      token.mint(
        TEST_NFT.name,
        TEST_NFT.description,
        TEST_NFT.imageUrl,
        TEST_NFT.imageHash,
        createdAt
      )
    )
      .to.emit(token, "Minted")
      .withArgs(0, "Covid-19 Ain't Cool", createdAt);

    await expect(token.list(0, utils.parseEther("0.5")))
      .to.emit(token, "ItemListedSuccessfully")
      .withArgs(0, utils.parseEther("0.5"));

    await expect(token.buyItem(0, { value: utils.parseEther("0.5") }))
      .to.emit(token, "ItemBought")
      .withArgs(sender.address, TEST_NFT.name, utils.parseEther("0.5"));

    const tokenData = await token.getTokenData(0);

    expect(tokenData.listed).to.be.false;
  });
});
