// scripts/utils/validators.js

/**
 * Validates that a given address is a valid Ethereum address.
 * @param {string} address - The address to validate.
 * @throws Will throw an error if the address is invalid.
 */
function validateAddress(address) {
    if (!ethers.utils.isAddress(address)) {
        throw new Error(`Invalid address: ${address}`);
    }
}

/**
 * Validates that a given amount is a positive number.
 * @param {number|string} amount - The amount to validate.
 * @throws Will throw an error if the amount is not positive.
 */
function validatePositiveAmount(amount) {
    if (typeof amount !== "number" && typeof amount !== "string") {
        throw new Error(`Invalid amount: ${amount}`);
    }
    if (parseFloat(amount) <= 0) {
        throw new Error(`Amount must be greater than zero: ${amount}`);
    }
}

/**
 * Validates that a given string is not empty.
 * @param {string} str - The string to validate.
 * @throws Will throw an error if the string is empty.
 */
function validateNonEmptyString(str) {
    if (typeof str !== "string" || str.trim() === "") {
        throw new Error(`String cannot be empty: ${str}`);
    }
}

module.exports = {
    validateAddress,
    validatePositiveAmount,
    validateNonEmptyString,
};
