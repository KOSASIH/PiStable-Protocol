class Governance:
    def __init__(self):
        self.proposals = []
        self.votes = {}

    def propose_change(self, proposal):
        self.proposals.append(proposal)
        self.votes[proposal] = []

    def vote(self, proposal, voter, decision):
        if proposal in self.proposals:
            self.votes[proposal].append((voter, decision))

    def tally_votes(self, proposal):
        if proposal in self.votes:
            return sum(1 for _, decision in self.votes[proposal] if decision)
        return 0
