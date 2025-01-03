// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityPool is Ownable {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public totalLiquidity;

    struct Liquidity {
        uint256 amountA;
        uint256 amountB;
    }

    mapping(address => Liquidity) public liquidityProviders;

    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than zero");
        
        tokenA.transferFrom(msg.sender, address(this), amountA);
        token B.transferFrom(msg.sender, address(this), amountB);
        
        Liquidity storage providerLiquidity = liquidityProviders[msg.sender];
        providerLiquidity.amountA += amountA;
        providerLiquidity.amountB += amountB;
        totalLiquidity += amountA + amountB;

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external {
        Liquidity storage providerLiquidity = liquidityProviders[msg.sender];
        require(providerLiquidity.amountA >= amountA && providerLiquidity.amountB >= amountB, "Insufficient liquidity");

        providerLiquidity.amountA -= amountA;
        providerLiquidity.amountB -= amountB;
        totalLiquidity -= amountA + amountB;

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, amountA, amountB);
    }

    function getLiquidity(address provider) external view returns (uint256 amountA, uint256 amountB) {
        Liquidity storage providerLiquidity = liquidityProviders[provider];
        return (providerLiquidity.amountA, providerLiquidity.amountB);
    }

    function getTotalLiquidity() external view returns (uint256) {
        return totalLiquidity;
    }
}
