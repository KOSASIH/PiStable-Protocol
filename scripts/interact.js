// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
    const [signer] = await ethers.getSigners();

    // Replace with the deployed contract addresses
    const piStableAddress = "0xYourPiStableAddress";
    const governanceAddress = "0xYourGovernanceAddress";
    const stakingAddress = "0xYourStakingAddress";
    const liquidityPoolAddress = "0xYourLiquidityPoolAddress";

    const PiStable = await ethers.getContractAt("PiStable", piStableAddress);
    const Governance = await ethers.getContractAt("Governance", governanceAddress);
    const Staking = await ethers.getContractAt("Staking", stakingAddress);
    const LiquidityPool = await ethers.getContractAt("LiquidityPool", liquidityPoolAddress);

    // Example: Stake tokens
    const stakeAmount = ethers.utils.parseUnits("100", 18); // 100 tokens
    await PiStable.approve(stakingAddress, stakeAmount);
    await Staking.stake(stakeAmount);
    console.log("Staked 100 tokens");

    // Example: Create a governance proposal
    const proposalDescription = "Change the reward rate for staking";
    await Governance.createProposal(proposalDescription);
    console.log("Created governance proposal:", proposalDescription);

    // Example: Add liquidity
    const amountA = ethers.utils.parseUnits("50", 18); // 50 tokens of token A
    const amountB = ethers.utils.parseUnits("50", 18); // 50 tokens of token B
    await PiStable.approve(liquidityPoolAddress, amountA);
    await PiStable.approve(liquidityPoolAddress, amountB);
    await LiquidityPool.addLiquidity(amountA, amountB);
    console.log("Added liquidity to the pool");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
