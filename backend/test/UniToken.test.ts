import {expect, use} from 'chai';
import {Contract,utils} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import UniToken from '../build/contracts/UniToken.json';

use(solidity);

const TEST_NFT = {
  name:"Covid-19 Ain't Cool",
  description:"Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.",
  imageUrl:"https://ipfs.infura.io/ipfs/QmQpQgkzxnEgMt7MYgtBJg1pzGRxT7sBhyR2LASZFi7bwi",
  imageHash:"0dd954732b26312eb4e10b1b9f21bb3b8d9b1a422c910e8942521e75b86ec65c"

}
describe('UniToken test cases', () => {
  const [sender, receiver] = new MockProvider().getWallets();
  let token: Contract;

  beforeEach(async () => {
    // @ts-ignore
    token = await deployContract(sender, UniToken);
  });

  it('Mint NFT', async () => {
    
    const createdAt = new Date().toString()
    await expect(token.mint(
      TEST_NFT.name,
      TEST_NFT.description,
      TEST_NFT.imageUrl,
      TEST_NFT.imageHash,
      createdAt
    )).to.emit(token,"Minted").withArgs(0,"Covid-19 Ain't Cool",createdAt)
  });

  it('Minting the same NFT should fail', async () => {
    const createdAt = new Date().toString()
    await expect(token.mint(
      TEST_NFT.name,
      TEST_NFT.description,
      TEST_NFT.imageUrl,
      TEST_NFT.imageHash,
      createdAt
    )).to.emit(token,"Minted").withArgs(0,"Covid-19 Ain't Cool",createdAt)

    await expect(token.mint(
      "Covid-19 Is Cool",
      TEST_NFT.description,
      TEST_NFT.imageUrl,
      TEST_NFT.imageHash,
      createdAt
    )).to.be.revertedWith('NFT already exists.')

  });

  it('Listing NFT', async () => {
    
    const createdAt = new Date().toString()
    await expect(token.mint(
      TEST_NFT.name,
      TEST_NFT.description,
      TEST_NFT.imageUrl,
      TEST_NFT.imageHash,
      createdAt
    )).to.emit(token,"Minted").withArgs(0,"Covid-19 Ain't Cool",createdAt)

    await expect(token.list(0,utils.parseEther("0.5"))).to.emit(token,"ItemListedSuccessfully")
  });

  it('Buying NFT', async () => {
    
    const createdAt = new Date().toString()
    await expect(token.mint(
      TEST_NFT.name,
      TEST_NFT.description,
      TEST_NFT.imageUrl,
      TEST_NFT.imageHash,
      createdAt
    )).to.emit(token,"Minted").withArgs(0,"Covid-19 Ain't Cool",createdAt)

    await expect(token.list(0,utils.parseEther("0.5"))).to.emit(token,"ItemListedSuccessfully")

    await expect(token.buyItem(0,{value:utils.parseEther("0.5")})).to.emit(token,"ItemBought")

  });

  // it('Transfer emits event', async () => {
  //   await expect(token.transfer(walletTo.address, 7))
  //     .to.emit(token, 'Transfer')
  //     .withArgs(wallet.address, walletTo.address, 7);
  // });

  // it('Can not transfer above the amount', async () => {
  //   await expect(token.transfer(walletTo.address, 1007)).to.be.reverted;
  // });

  // it('Can not transfer from empty account', async () => {
  //   //@ts-ignore
  //   const tokenFromOtherWallet = token.connect(walletTo);
  //   await expect(tokenFromOtherWallet.transfer(wallet.address, 1))
  //     .to.be.reverted;
  // });

  // it('Calls totalSupply on BasicToken contract', async () => {
  //   await token.totalSupply();
  //   expect('totalSupply').to.be.calledOnContract(token);
  // });

  // it('Calls balanceOf with sender address on BasicToken contract', async () => {
  //   await token.balanceOf(wallet.address);
  //   expect('balanceOf').to.be.calledOnContractWith(token, [wallet.address]);
  // });
});
