import logging

class Audit:
    def __init__(self):
        logging.basicConfig(filename='audit.log', level=logging.INFO)

    def log_transaction(self, transaction_id, details):
        logging.info(f"Transaction ID: {transaction_id}, Details: {details}")

    def log_governance_action(self, action, details):
        logging.info(f"Governance Action: {action}, Details: {details}")
