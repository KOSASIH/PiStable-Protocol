// src/hooks/useGovernance.js
import { useState, useEffect } from 'react';
import { getGovernanceContract } from '../services/blockchain';
import { ADDRESSES } from '../utils/constants';

export const useGovernance = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProposals = async () => {
        const contract = getGovernanceContract(ADDRESSES.GOVERNANCE);
        const proposalCount = await contract.getProposalCount();
        const proposalsArray = [];

        for (let i = 0; i < proposalCount; i++) {
            const proposal = await contract.getProposal(i);
            proposalsArray.push({
                description: proposal.description,
                voteCount: proposal.voteCount.toString(),
                executed: proposal.executed,
            });
        }

        setProposals(proposalsArray);
        setLoading(false);
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    const createProposal = async (description) => {
        const contract = getGovernanceContract(ADDRESSES.GOVERNANCE);
        await contract.createProposal(description);
        fetchProposals(); // Refresh proposals after creating a new one
    };

    return { proposals, loading, createProposal };
};
