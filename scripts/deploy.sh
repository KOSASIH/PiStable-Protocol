#!/bin/bash

# Deployment Script for PiStable Protocol

echo "Starting the deployment process..."

# Set environment variables
export NODE_ENV=production

# Deploy the backend
cd backend || exit
echo "Deploying the backend application..."
npm run deploy

# Deploy the frontend
cd ../frontend || exit
echo "Deploying the frontend application..."
npm run deploy

# Notify completion
echo "Deployment process completed successfully!"
