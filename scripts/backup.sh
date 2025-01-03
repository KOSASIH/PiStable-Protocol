#!/bin/bash

# Backup Script for PiStable Protocol

echo "Starting the backup process..."

# Define backup directory
BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

# Backup the database
echo "Backing up the database..."
mongodump --uri="mongodb://localhost:27017/pistable" --out="$BACKUP_DIR/db_backup_$(date +%Y%m%d_%H%M%S)"

# Backup smart contracts
echo "Backing up smart contracts..."
cp -r ./backend/contracts "$BACKUP_DIR/contracts_backup_$(date +%Y%m%d_%H%M%S)"

echo "Backup process completed successfully!"
