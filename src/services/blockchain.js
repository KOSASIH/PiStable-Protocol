// src/services/blockchain.js
import { ethers } from 'ethers';
import PiStableArtifact from '../artifacts/PiStable.json'; // Adjust the path as necessary
import GovernanceArtifact from '../artifacts/Governance.json'; // Adjust the path as necessary

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

export const connectWallet = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    return accounts[0];
};

export const getPiStableContract = (address) => {
    return new ethers.Contract(address, PiStableArtifact.abi, signer);
};

export const getGovernanceContract = (address) => {
    return new ethers.Contract(address, GovernanceArtifact.abi, signer);
};

// Example function to stake tokens
export const stakeTokens = async (contractAddress, amount) => {
    const piStableContract = getPiStableContract(contractAddress);
    const tx = await piStableContract.stake(amount);
    await tx.wait();
    return tx;
};

// Example function to create a governance proposal
export const createProposal = async (contractAddress, description) => {
    const governanceContract = getGovernanceContract(contractAddress);
    const tx = await governanceContract.createProposal(description);
    await tx.wait();
    return tx;
};
