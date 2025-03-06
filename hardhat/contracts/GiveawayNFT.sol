// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GiveawayNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("Giveaway", "GA") {
        tokenCounter = 0;
    }

    function giveaway(address recipient) returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        tokenCounter++;
        return newItemId;
    }
}