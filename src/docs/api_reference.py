class APIReference:
    def __init__(self):
        self.endpoints = {
            "get_price": {
                "method": "GET",
                "description": "Fetch the current price of the asset.",
                "params": {},
                "example": "/api/get_price"
            },
            "submit_transaction": {
                "method": "POST",
                "description": "Submit a new transaction.",
                "params": {"amount": "float", "to": "string"},
                "example": "/api/submit_transaction"
            },
            "vote": {
                "method": "POST",
                "description": "Vote on a governance proposal.",
                "params": {"proposal_id": "string", "decision": "bool"},
                "example": "/api/vote"
            }
        }

    def get_reference(self):
        return self.endpoints
