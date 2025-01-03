// src/hooks/useToken.js
import { useState, useEffect } from 'react';
import { getPiStableContract } from '../services/blockchain';
import { ADDRESSES } from '../utils/constants';

export const useToken = () => {
    const [balance, setBalance] = useState('0');
    const [loading, setLoading] = useState(true);

    const fetchBalance = async (account) => {
        const contract = getPiStableContract(ADDRESSES.PI_STABLE);
        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
        setLoading(false);
    };

    useEffect(() => {
        const account = window.ethereum.selectedAddress;
        if (account) {
            fetchBalance(account);
        }
    }, []);

    return { balance, loading };
};
