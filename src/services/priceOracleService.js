// src/services/priceOracleService.js
import { ethers } from 'ethers';
import PriceOracleArtifact from '../artifacts/PriceOracle.json'; // Adjust the path as necessary

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

export const connectWallet = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    return accounts[0];
};

export const getPriceOracleContract = (address) => {
    return new ethers.Contract(address, PriceOracleArtifact.abi, signer);
};

// Example function to get the price of a token
export const getPrice = async (contractAddress, tokenAddress) => {
    const priceOracleContract = getPriceOracleContract(contractAddress);
    const price = await priceOracleContract.getPrice(tokenAddress);
    return ethers.utils.formatUnits(price, 18); // Adjust decimals as necessary
};

// Example function to update the price of a token
export const updatePrice = async (contractAddress, tokenAddress, price) => {
    const priceOracleContract = getPriceOracleContract(contractAddress);
    const tx = await priceOracleContract.updatePrice(tokenAddress, ethers.utils.parseUnits(price.toString(), 18));
    await tx.wait();
    return tx;
};
