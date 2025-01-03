// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiStable is ERC20, Ownable {
    // The value of the stablecoin in USD (pegged to $314.159)
    uint256 public constant STABLE_COIN_VALUE = 314159000000000000000; // 314.159 in wei (1e18 = 1 token)
    uint256 public constant TOTAL_SUPPLY = 200000000000 * (10 ** decimals()); // 200 billion tokens

    // Event to emit when the value is updated
    event ValueUpdated(uint256 newValue);

    constructor() ERC20("PiStable", "PST") {
        _mint(msg.sender, TOTAL_SUPPLY); // Mint total supply to the owner
    }

    // Function to get the current value of the stablecoin
    function getStableCoinValue() external pure returns (uint256) {
        return STABLE_COIN_VALUE;
    }

    // Function to buy stablecoins
    function buyStableCoins() external payable {
        require(msg.value > 0, "Send ETH to buy stablecoins");
        uint256 amountToMint = (msg.value * STABLE_COIN_VALUE) / 1 ether; // Calculate amount based on the stablecoin value
        _mint(msg.sender, amountToMint);
    }

    // Function to withdraw ETH from the contract
    function withdraw(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }
}
