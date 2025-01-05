import argparse
from price_stabilization import PriceStabilization
from governance import Governance
from audit import Audit
from notifications import Notifications

class CLI:
    def __init__(self):
        self.parser = argparse.ArgumentParser(description="PiStable Protocol CLI")
        self.price_stabilization = PriceStabilization()
        self.governance = Governance()
        self.audit = Audit()
        self.notifications = Notifications(smtp_server='smtp.example.com', smtp_port=587, username='user@example.com', password='password')
        self.setup_commands()

    def setup_commands(self):
        self.parser.add_argument('--view', action='store_true', help='View transaction history')
        self.parser.add_argument('--vote', nargs=2, help='Vote on a proposal: [proposal_id decision]')
        self.parser.add_argument('--propose', help='Propose a new governance change')
        self.parser.add_argument('--notify', nargs=2, help='Send notification: [email subject message]')
        self.parser.add_argument('--adjust-price', nargs=2, help='Adjust price stabilization: [current_price target_price]')

    def run(self):
        args = self.parser.parse_args()
        if args.view:
            self.view_transactions()
        elif args.vote:
            self.vote_on_proposal(args.vote[0], args.vote[1])
        elif args.propose:
            self.propose_change(args.propose)
        elif args.notify:
            self.send_notification(args.notify[0], args.notify[1])
        elif args.adjust_price:
            self.adjust_price_stabilization(float(args.adjust_price[0]), float(args.adjust_price[1]))
        else:
            self.parser.print_help()

    def view_transactions(self):
        # Logic to view transactions (placeholder)
        print("Viewing transaction history...")
        # Here you would typically fetch and display transaction data
        # For example: print(transaction_history)

    def vote_on_proposal(self, proposal_id, decision):
        # Logic to vote on a proposal
        decision = decision.lower() == 'true'  # Convert to boolean
        self.governance.vote(proposal_id, 'user_id', decision)  # Replace 'user_id' with actual user identifier
        print(f"Voted on proposal {proposal_id} with decision {decision}.")

    def propose_change(self, proposal):
        # Logic to propose a change
        self.governance.propose_change(proposal)
        print(f"Proposed change: {proposal}")

    def send_notification(self, subject, message):
        # Logic to send a notification
        self.notifications.send_email('recipient@example.com', subject, message)  # Replace with actual recipient
        print(f"Notification sent: {subject}")

    def adjust_price_stabilization(self, current_price, target_price):
        action = self.price_stabilization.adjust_supply(current_price, target_price)
        print(f"Price stabilization action: {action}")

if __name__ == '__main__':
    cli = CLI()
    cli.run()
