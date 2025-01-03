// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernance {
    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address indexed voter);
    event ProposalExecuted(uint256 proposalId);

    function createProposal(string calldata description) external;
    function vote(uint256 proposalId) external;
    function executeProposal(uint256 proposalId) external;
    function getProposalCount() external view returns (uint256);
    function getProposal(uint256 proposalId) external view returns (string memory description, uint256 voteCount, bool executed);
}
