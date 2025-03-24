// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GiveawayNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("Giveaway", "GA") {
        tokenCounter = 0;
    }

    function giveaway(address[] memory recipients) public returns (uint256) {
        for (uint i = 0; i < recipients.length; i++) {
            uint256 newItemId = tokenCounter;
            _safeMint(recipients[i], newItemId);
            tokenCounter++;
        }
        return recipients.length;
    }
}
