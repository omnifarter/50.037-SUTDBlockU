// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./UniToken.sol";

contract UniMarketplace {
    UniToken private _uniToken;

    constructor(UniToken tokenAddress) {
        _uniToken = tokenAddress;
    }

    struct ListedItem {
        uint256 listingId; // Index of listed item used to track selling status of a particular listing
        uint256 tokenId; 
        uint256 price; // Price set by seller
        address seller; 
        bool sold; // Track if NFT is sold for frontend filtering & to be set to true once item is sold
    }
    
    // Array to store all listed tokens and their statuses
    ListedItem[] public itemsListed;

    // Mapping to check if tokenId is listed on the marketplace and can be bought 
    mapping(uint256 => bool) public isListed;
    
    // Function modifier to check if lister has the token to prevent hackers from listing other peoples' tokens
    modifier IsItemOwner(uint256 tokenId){
        require(_uniToken.ownerOf(tokenId) == msg.sender, "Sender does not own the item");
        _;
    }

    // Function modifier to check if a listed item is still for sale
    modifier IsForSale(uint256 listingId){
        require(!itemsListed[listingId].sold, "Item has been sold");
        _;
    }


    event ItemListedSuccessfully(uint256 newItemId, uint256 tokenId, uint256 price);
    event ItemSold(uint256 listingId, address buyer, uint256 price);

    // List owned NFT with price and tokenId passed from frontend
    function list(uint256 tokenId, uint256 price) 

    external 
    returns (uint256){
        require(!isListed[tokenId], "Item already listed on marketplace");

        uint256 listingId = itemsListed.length;

        // Add new listed item into itemsListed array
        itemsListed.push(ListedItem({
            listingId: listingId,
            tokenId: tokenId,
            seller: msg.sender, // Seller address to be made payable in Buy function
            price: price,
            sold: false
        }));

        // Set is listed tracking to true to prevent relisting of same token
        isListed[tokenId] = true;

        // Emit event to the frontend to update the UI
        emit ItemListedSuccessfully(listingId, tokenId, price);
        
        return listingId;
    }
    
    // Function called to purchase a listed item
    function buyItem(uint256 listingId) 
    IsForSale(listingId)
    payable 
    external {
        uint256 tokenId = itemsListed[listingId].tokenId;
        address seller = itemsListed[listingId].seller;
        uint256 price = itemsListed[listingId].price;
        
        // I think this function calls the metamask (adapted from https://github.com/ethereum-boilerplate/ethereum-nft-marketplace-boilerplate/blob/main/src/contracts/marketplaceBoilerplate.sol)
        // Need to test on frontend
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        // Set the sold variable in the itemsListed array to true
        itemsListed[listingId].sold = true;

        // Set listed to false
        isListed[tokenId] = false;

        // Transfer funds from buyer to seller
        payable(seller).transfer(price);

        // Call the tranfer function from UniToken
        _uniToken.transferFrom(seller, msg.sender, tokenId);

        emit ItemSold(listingId, msg.sender, price);
    }

}