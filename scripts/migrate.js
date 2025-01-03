// scripts/migrate.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    // Replace with the deployed contract addresses
    const oldContractAddress = "0xYourOldContractAddress";
    const NewContract = await ethers.getContractFactory("NewContract");

    // Deploy the new contract
    const newContract = await NewContract.deploy();
    await newContract.deployed();
    console.log("NewContract deployed to:", newContract.address);

    // Migrate state from the old contract to the new contract
    const oldContract = await ethers.getContractAt("OldContract", oldContractAddress);
    const stateData = await oldContract.getStateData(); // Example function to get state data

    await newContract.setStateData(stateData); // Example function to set state data
    console.log("Migrated state data from old contract to new contract");

    // Optionally, you can disable the old contract or transfer ownership
    await oldContract.disable(); // Example function to disable the old contract
    console.log("Old contract disabled");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
