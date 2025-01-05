from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization

class Security:
    def __init__(self):
        self.private_key = ec.generate_private_key(ec.SECP256R1())
        self.public_key = self.private_key.public_key()

    def sign_transaction(self, transaction):
        signature = self.private_key.sign(transaction.encode())
        return signature

    def verify_signature(self, transaction, signature):
        try:
            self.public_key.verify(signature, transaction.encode())
            return True
        except Exception:
            return False
