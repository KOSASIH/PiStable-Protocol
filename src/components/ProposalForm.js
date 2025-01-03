// src/components/ProposalForm.js
import React, { useState } from 'react';
import { useGovernance } from '../hooks/useGovernance';

const ProposalForm = () => {
    const [description, setDescription] = useState('');
    const { createProposal } = useGovernance();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description) {
            alert("Proposal description cannot be empty.");
            return;
        }
        try {
            await createProposal(description);
            setDescription('');
            alert("Proposal created successfully!");
        } catch (error) {
            console.error("Error creating proposal:", error);
            alert("Failed to create proposal.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Governance Proposal</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter proposal description"
                required
            />
            <button type="submit">Submit Proposal</button>
        </form>
    );
};

export default ProposalForm;
