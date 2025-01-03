// src/services/api.js
import axios from 'axios';

const API_URL = 'https://api.pistableprotocol.com'; // Replace with your actual API URL

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Example function to get market data
export const getMarketData = async () => {
    try {
        const response = await api.get('/market-data');
        return response.data;
    } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
    }
};

// Example function to get user data
export const getUser Data = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Example function to create a new user
export const createUser  = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export default api;
