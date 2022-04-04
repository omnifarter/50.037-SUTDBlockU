// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract UniToken is ERC721Enumerable{
    // structure of metadata stored on the chain
    struct UniNFT {
        string name;
        string description;
        string imgUrl;
        address creator;
        string imgHash;
        string createdAt;
    }

    // tokenIds to UniNFT metadata
    mapping (uint256 => UniNFT) private mintedNFTs;

    constructor() ERC721("UniToken", "UTN") {}

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
            name: name,
            description: description,
            imgUrl: imgUrl,
            creator: msg.sender,
            imgHash: imgHash,
            createdAt: createdAt
        });

        _mint(msg.sender, tokenId);

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
}

