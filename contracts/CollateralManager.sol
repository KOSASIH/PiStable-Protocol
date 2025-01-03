// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CollateralManager is Ownable {
    IERC20 public collateralToken;
    uint256 public totalCollateral;
    uint256 public collateralizationRatio = 150; // 150%

    mapping(address => uint256) public collateralBalances;

    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    event CollateralizationRatioUpdated(uint256 newRatio);

    constructor(IERC20 _collateralToken) {
        collateralToken = _collateralToken;
    }

    function depositCollateral(uint256 amount ) external {
        require(amount > 0, "Amount must be greater than zero");
        collateralToken.transferFrom(msg.sender, address(this), amount);
        collateralBalances[msg.sender] += amount;
        totalCollateral += amount;

        emit CollateralDeposited(msg.sender, amount);
    }

    function withdrawCollateral(uint256 amount) external {
        require(collateralBalances[msg.sender] >= amount, "Insufficient collateral");
        require((totalCollateral - amount) * 100 / totalCollateral >= collateralizationRatio, "Withdrawal would breach collateralization ratio");
        
        collateralBalances[msg.sender] -= amount;
        totalCollateral -= amount;
        collateralToken.transfer(msg.sender, amount);

        emit CollateralWithdrawn(msg.sender, amount);
    }

    function updateCollateralizationRatio(uint256 newRatio) external onlyOwner {
        require(newRatio > 0, "Ratio must be greater than zero");
        collateralizationRatio = newRatio;
        emit CollateralizationRatioUpdated(newRatio);
    }

    function getCollateralBalance(address user) external view returns (uint256) {
        return collateralBalances[user];
    }

    function getTotalCollateral() external view returns (uint256) {
        return totalCollateral;
    }

    function getCollateralizationRatio() external view returns (uint256) {
        return collateralizationRatio;
    }
}
