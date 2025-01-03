#!/bin/bash

# Test Script for PiStable Protocol

echo "Starting the test process..."

# Navigate to the backend directory and run tests
cd backend || exit
echo "Running backend tests..."
npm test

# Navigate to the frontend directory and run tests
cd ../frontend || exit
echo "Running frontend tests..."
npm test

echo "Test process completed successfully!"
