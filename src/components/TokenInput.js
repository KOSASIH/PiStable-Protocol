// src/components/TokenInput.js
import React, { useState } from 'react';
import { validatePositiveAmount } from '../utils/validators';

const TokenInput = ({ label, onChange }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setAmount(value);

        try {
            validatePositiveAmount(value);
            setError('');
            onChange(value);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="token-input">
            <label>{label}</label>
            <input
                type="text"
                value={amount}
                onChange={handleChange}
                placeholder="Enter amount"
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default TokenInput;
