// src/pages/Governance.js
import React from 'react';
import ProposalForm from '../components/ProposalForm';
import { useGovernance } from '../hooks/useGovernance';

const Governance = () => {
    const { proposals } = useGovernance();

    return (
        <div className="governance">
            <h2>Governance</h2>
            <ProposalForm />
            <h3>Current Proposals</h3>
            <ul>
                {proposals.map((proposal, index) => (
                    <li key={index}>
                        <strong>{proposal.description}</strong>
                        <p>Votes: {proposal.voteCount}</p>
                        <p>Status: {proposal.executed ? "Executed" : "Pending"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Governance;
