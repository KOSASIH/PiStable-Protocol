// src/hooks/useStaking.js
import { useState, useEffect } from 'react';
import { getGovernanceContract } from '../services/blockchain';
import { ADDRESSES } from '../utils/constants';

export const useStaking = () => {
    const [stakedAmount, setStakedAmount] = useState('0');
    const [rewards, setRewards] = useState('0');
    const [loading, setLoading] = useState(true);

    const fetchStakingData = async (account) => {
        const contract = getGovernanceContract(ADDRESSES.STAKING);
        const amount = await contract.getStakedAmount(account);
        const rewardAmount = await contract.calculateRewards(account);
        setStakedAmount(amount.toString());
        setRewards(rewardAmount.toString());
        setLoading(false);
    };

    useEffect(() => {
        const account = window.ethereum.selectedAddress;
        if (account) {
            fetchStakingData(account);
        }
    }, []);

    const stakeTokens = async (amount) => {
        const contract = getGovernanceContract(ADDRESSES.STAKING);
        await contract.stake(amount);
        fetchStakingData(window.ethereum.selectedAddress); // Refresh staking data after staking
    };

    return { stakedAmount, rewards, loading, stakeTokens };
};
