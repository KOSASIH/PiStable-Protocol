// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Get the contract factories
    const PiStable = await ethers.getContractFactory("PiStable");
    const Governance = await ethers.getContractFactory("Governance");
    const CollateralManager = await ethers.getContractFactory("CollateralManager");
    const PriceOracle = await ethers.getContractFactory("PriceOracle");
    const Staking = await ethers.getContractFactory("Staking");
    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const Escrow = await ethers.getContractFactory("Escrow");

    // Deploy contracts
    const piStable = await PiStable.deploy();
    await piStable.deployed();
    console.log("PiStable deployed to:", piStable.address);

    const governance = await Governance.deploy(piStable.address);
    await governance.deployed();
    console.log("Governance deployed to:", governance.address);

    const collateralManager = await CollateralManager.deploy(piStable.address);
    await collateralManager.deployed();
    console.log("CollateralManager deployed to:", collateralManager.address);

    const priceOracle = await PriceOracle.deploy([/* initial price providers */]);
    await priceOracle.deployed();
    console.log("PriceOracle deployed to:", priceOracle.address);

    const staking = await Staking.deploy(piStable.address, ethers.utils.parseUnits("1", 18)); // Example reward rate
    await staking.deployed();
    console.log("Staking deployed to:", staking.address);

    const liquidityPool = await LiquidityPool.deploy(/* tokenA, tokenB addresses */);
    await liquidityPool.deployed();
    console.log("LiquidityPool deployed to:", liquidityPool.address);

    const multiSigWallet = await MultiSigWallet.deploy([/* owner addresses */], 2); // Example required confirmations
    await multiSigWallet.deployed();
    console.log("MultiSigWallet deployed to:", multiSigWallet.address);

    const escrow = await Escrow.deploy();
    await escrow.deployed();
    console.log("Escrow deployed to:", escrow.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
