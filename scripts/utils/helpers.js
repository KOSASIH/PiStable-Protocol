// scripts/utils/helpers.js

const { ethers } = require("hardhat");

/**
 * Converts a number to a BigNumber with the specified decimals.
 * @param {number|string} value - The value to convert.
 * @param {number} decimals - The number of decimals.
 * @returns {BigNumber} - The converted BigNumber.
 */
function toBigNumber(value, decimals) {
    return ethers.utils.parseUnits(value.toString(), decimals);
}

/**
 * Waits for a transaction to be mined and returns the receipt.
 * @param {Promise<ContractTransaction>} tx - The transaction promise.
 * @returns {Promise<TransactionReceipt>} - The transaction receipt.
 */
async function waitForTransaction(tx) {
    const receipt = await tx.wait();
    return receipt;
}

/**
 * Logs the details of a transaction.
 * @param {TransactionReceipt} receipt - The transaction receipt.
 */
function logTransaction(receipt) {
    console.log(`Transaction Hash: ${receipt.transactionHash}`);
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
}

module.exports = {
    toBigNumber,
    waitForTransaction,
    logTransaction,
};
