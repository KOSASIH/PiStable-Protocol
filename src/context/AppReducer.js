// src/context/AppReducer.js

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_TOKEN_BALANCE':
            return {
                ...state,
                tokenBalance: action.payload,
            };
        case 'ADD_GOVERNANCE_PROPOSAL':
            return {
                ...state,
                governanceProposals: [...state.governanceProposals, action.payload],
            };
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
};

export default AppReducer;
