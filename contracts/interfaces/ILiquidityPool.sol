// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILiquidityPool {
    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);

    function addLiquidity(uint256 amountA, uint256 amountB) external;
    function removeLiquidity(uint256 amountA, uint256 amountB) external;
    function getLiquidity(address provider) external view returns (uint256 amountA, uint256 amountB);
    function getTotalLiquidity() external view returns (uint256);
}
