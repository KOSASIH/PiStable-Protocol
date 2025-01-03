// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PriceOracle is Ownable {
    mapping(address => uint256) public prices; // Token address to price mapping
    address[] public priceProviders; // List of authorized price providers

    event PriceUpdated(address indexed token, uint256 price);

    modifier onlyPriceProvider() {
        require(isPriceProvider(msg.sender), "Not an authorized price provider");
        _;
    }

    constructor(address[] memory _priceProviders) {
        priceProviders = _priceProviders;
    }

    function isPriceProvider(address provider) public view returns (bool) {
        for (uint256 i = 0; i < priceProviders.length; i++) {
            if (priceProviders[i] == provider) {
                return true;
            }
        }
        return false;
    }

    function updatePrice(address token, uint256 price) external onlyPriceProvider {
        prices[token] = price;
        emit PriceUpdated(token, price);
    }

    function getPrice(address token) external view returns (uint256) {
        return prices[token];
    }
}
