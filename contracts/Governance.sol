// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Governance is Ownable {
    IERC20 public token;

    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address voter);
    event ProposalExecuted(uint256 proposalId);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createProposal(string memory description) external onlyOwner {
        proposals.push();
        Proposal storage newProposal = proposals[proposals.length - 1];
        newProposal.description = description;
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        require(token.balanceOf(msg.sender) > 0, "No voting power");

        proposal.voters[msg.sender] = true;
        proposal.voteCount += token.balanceOf(msg.sender);
        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount > (token.totalSupply() / 2), "Not enough votes");

        // Execute the proposal logic here (e.g., change parameters)
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }
}
