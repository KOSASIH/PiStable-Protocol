// src/components/StakingForm.js
import React, { useState } from 'react';
import TokenInput from './TokenInput';
import { useStaking } from '../hooks/useStaking';

const StakingForm = () => {
    const [amount, setAmount] = useState('');
    const { stakeTokens } = useStaking();

    const handleStake = async (e) => {
        e.preventDefault();
        try {
            await stakeTokens(amount);
            alert("Staked successfully!");
            setAmount('');
        } catch (error) {
            console.error("Error staking tokens:", error);
            alert("Failed to stake tokens.");
        }
    };

   ```javascript
    return (
        <form onSubmit={handleStake}>
            <h2>Stake Your Tokens</h2>
            <TokenInput label="Amount to Stake" onChange={setAmount} />
            <button type="submit" disabled={!amount}>Stake Tokens</button>
        </form>
    );
};

export default StakingForm;
