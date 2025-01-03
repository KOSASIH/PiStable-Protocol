// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStaking {
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 rewards);

    function stake(uint256 amount) external;
    function unstake() external;
    function calculateRewards(address user) external view returns (uint256);
    function getStakedAmount(address user) external view returns (uint256);
}
