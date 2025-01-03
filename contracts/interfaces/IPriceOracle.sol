// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPriceOracle {
    event PriceUpdated(address indexed token, uint256 price);

    function updatePrice(address token, uint256 price) external;
    function getPrice(address token) external view returns (uint256);
    function isPriceProvider(address provider) external view returns (bool);
}
