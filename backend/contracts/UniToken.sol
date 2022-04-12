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
        bool listed;
        uint256 price;
    }

    struct Transaction {
        address seller;
        address buyer;
        uint256 price;
        uint256 tokenId;
    }

    Transaction[] transactionHistory;

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
            createdAt: createdAt,
            listed: false,
            price: 0
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

    // Function modifier to check if lister has the token to prevent hackers from listing other peoples' tokens
    modifier IsItemOwner(uint256 tokenId){
        require(ownerOf(tokenId) == msg.sender, "Sender does not own the item");
        _;
    }

    // Function modifier to check if a listed item is still for sale
    modifier IsListed(uint256 tokenId){
        require(!mintedNFTs[tokenId].listed, "Item is not listed");
        _;
    }

     // Function modifier to check if item is already listed on marketplace
    modifier IsNotListed(uint256 tokenId) {
        require(mintedNFTs[tokenId].listed, "Item is listed");
        _;
    }

    event ItemListedSuccessfully(uint256 tokenId, uint256 price);
    event ItemBought(address seller, address buyer, uint256 price);    

    // List owned NFT with price and tokenId passed from frontend
    function list(uint256 tokenId, uint256 price) 
    IsItemOwner(tokenId)
    IsNotListed(tokenId)
    external {
        mintedNFTs[tokenId].price = price;
        mintedNFTs[tokenId].listed = true;

        // Emit event to the frontend to update the UI
        emit ItemListedSuccessfully(tokenId, price);
    }
    
    // Function called to purchase a listed item
    function buyItem(uint256 tokenId) 
    IsListed(tokenId)
    payable 
    external { 

        uint256 currentPrice = mintedNFTs[tokenId].price;

        // Need to test on frontend
        require(msg.value == currentPrice, "Please submit the asking price in order to complete the purchase");

        address seller = mintedNFTs[tokenId].owner;
    
        // Transfer funds from buyer to seller
        payable(seller).transfer(currentPrice);

        
        mintedNFTs[tokenId].owner = msg.sender;
        // Set listed to false
        mintedNFTs[tokenId].listed = false;
        // Reset price to 0
        mintedNFTs[tokenId].price = 0;

        // Call the transfer function from UniToken
        transferFrom(seller, msg.sender, tokenId);

        // Create transaction item
        transactionHistory.push(Transaction(seller, msg.sender, currentPrice, tokenId));

        emit ItemBought(seller, msg.sender, currentPrice);
    }

    function getListedNFTs() public view returns (UniNFT[] memory){
        uint count = 0;
        for (uint i = 0; i < totalSupply(); i++) {
            if (mintedNFTs[i].listed) {
                count++;
            }
        }
        
        UniNFT[] memory listedNFTs = new UniNFT[](count);
        uint j = 0;

        for (uint i = 0; i < totalSupply(); i++ ) {
            if (mintedNFTs[i].listed) {
                listedNFTs[j] = mintedNFTs[i];
                j++;
            }    
        }

        return listedNFTs;
    }

    function getUserNFTs() public view returns (UniNFT[] memory) {
        uint count = 0;
        for (uint i = 0; i < totalSupply(); i++) {
            if (mintedNFTs[i].owner == msg.sender) {
                count++;
            }
        }
        
        UniNFT[] memory userNFTs = new UniNFT[](count);
        uint j = 0;

        for (uint i = 0; i < totalSupply(); i++ ) {
            if (mintedNFTs[i].owner == msg.sender) {
                userNFTs[j] = mintedNFTs[i];
                j++;
            }    
        }

        return userNFTs;
    }

    function getTokenData(uint256 tokenId) public view returns(UniNFT memory) {
        return mintedNFTs[tokenId];
    }

    function getTransactionHistory() public view returns(Transaction[] memory) {
        return transactionHistory;
    }

    function getNumTokens() public view returns(uint256) {
        return totalSupply();
    }
}

