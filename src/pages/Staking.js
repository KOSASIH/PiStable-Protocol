// src/pages/Staking.js
import React from 'react';
import StakingForm from '../components/StakingForm';
import { useStaking } from '../hooks/useStaking';

const Staking = () => {
    const { stakedAmount, rewards } = useStaking();

    return (
        <div className="staking">
            <h2>Staking</h2>
            <StakingForm />
            <h3>Your Staking Status</h3>
            <p>Staked Amount: {stakedAmount} PST</p>
            <p>Earned Rewards: {rewards} PST</p>
        </div>
    );
};

export default Staking;
