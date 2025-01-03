// src/context/AppContext.js
import React, { createContext, useReducer, useContext } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    user: null,
    tokenBalance: '0',
    governanceProposals: [],
};

// Create context
const AppContext = createContext(initialState);

// Provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    return useContext(AppContext);
};
