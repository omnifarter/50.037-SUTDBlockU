// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract UniToken is ERC721Enumerable{
    // Structure of metadata stored on the chain
    struct UniNFT {
        uint256 id;
        string name;
        string description;
        string imgUrl;
        address creator;
        address owner;
        string imgHash;
        string createdAt;
    }

    // tokenIds to UniNFT metadata
    mapping (uint256 => UniNFT) public mintedNFTs;

    constructor() ERC721("UniToken", "UTN") {}

    event Minted (
        uint256 tokenId,
        string name,
        string createdAt
    );

    // Minting function that assigns the new token metadata passed from frontend to a tokenId.
    // Minted token is assigned to the address of the caller.
    function mint(string memory name, 
        string memory description,
        string memory imgUrl,
        string memory imgHash,
        string memory createdAt
    ) external returns (uint) {
        // Call the verify function to check if imgHash exists in our mintedNFTs mapping
        require(_verify(imgHash), "NFT already exists.");

        // Get the total supply of tokens and assign the new token id to it
        uint tokenId = totalSupply();

        // Assign metadata to the tokenId
        mintedNFTs[tokenId] = UniNFT({
            id: tokenId,
            name: name,
            description: description,
            imgUrl: imgUrl,
            creator: msg.sender,
            owner: msg.sender,
            imgHash: imgHash,
            createdAt: createdAt
        });

        _mint(msg.sender, tokenId);

        // Emit event
        emit Minted(tokenId, name, createdAt);

        return tokenId;
    }

    // Checks if imgHash exists in mintedNFTs
    function _verify(string memory imgHash) private view returns(bool) {
        for (uint i = 0; i < totalSupply(); i++) {
            // Compare the 2 strings by hashing to save gas
            if (keccak256(abi.encode(imgHash)) == keccak256(abi.encode(mintedNFTs[i].imgHash))) {
                return false;
            }
        }
        return true;
    }

    function setOwner(address owner, uint256 tokenId) external {
        mintedNFTs[tokenId].owner = owner;
    }

    function getTokenData(uint256 tokenId) public view returns(UniNFT memory) {
        return mintedNFTs[tokenId];
    }

    function getNumTokens() public view returns(uint256) {
        return totalSupply();
    }
}

