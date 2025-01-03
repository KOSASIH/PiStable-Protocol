#!/bin/bash

# Build Script for PiStable Protocol

echo "Starting the build process..."

# Navigate to the frontend directory and build the React app
cd frontend || exit
echo "Building the frontend application..."
npm install
npm run build

# Navigate to the backend directory and build the backend
cd ../backend || exit
echo "Building the backend application..."
npm install

echo "Build process completed successfully!"
