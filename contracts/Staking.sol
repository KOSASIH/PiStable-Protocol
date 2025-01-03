// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public stakingToken;
    uint256 public totalStaked;
    uint256 public rewardRate; // Reward rate per block

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewards;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 rewards);

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        Stake storage userStake = stakes[msg.sender];
        userStake.amount += amount;
        userStake.startTime = block.timestamp;

        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No staked amount");

        uint256 rewards = calculateRewards(msg.sender);
        stakingToken.transfer(msg.sender, userStake.amount);
        userStake.amount = 0;
        userStake.rewards += rewards;

        emit Unstaked(msg.sender, userStake.amount, rewards);
    }

    function calculateRewards(address user) public view returns (uint256) {
        Stake storage userStake = stakes[user];
        uint256 duration = block.timestamp - userStake.startTime;
        return (userStake.amount * rewardRate * duration) / 1e18; // Adjust for precision
    }
}
