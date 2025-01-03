// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiSigWallet is Ownable {
    event Deposit(address indexed sender, uint256 amount);
    event SubmitTransaction(address indexed owner, uint256 indexed txIndex);
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 confirmations;
        mapping(address => bool) isConfirmed;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    Transaction[] public transactions;
    uint256 public requiredConfirmations;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier txExists(uint256 txIndex) {
        require(txIndex < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 txIndex) {
        require(!transactions[txIndex].executed, "Transaction already executed");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredConfirmations) {
        require(_owners.length > 0, "Owners required");
        require(_requiredConfirmations > 0 && _requiredConfirmations <= _owners.length, "Invalid number of required confirmations");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredConfirmations = _requiredConfirmations;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address to, uint256 value) external onlyOwner {
        uint256 txIndex = transactions.length;
        transactions.push(Transaction({
            to: to,
            value: value,
            executed: false,
            confirmations: 0
        }));
        emit SubmitTransaction(msg.sender, txIndex);
    }

    function confirmTransaction(uint256 txIndex) external onlyOwner txExists(txIndex) notExecuted(txIndex) {
        Transaction storage transaction = transactions[txIndex];
        require(!transaction.isConfirmed[msg.sender], "Transaction already confirmed");

        transaction.isConfirmed[msg.sender] = true;
        transaction.confirmations += 1;
        emit ConfirmTransaction(msg.sender, txIndex);

        if (transaction.confirmations >= requiredConfirmations) {
            executeTransaction(txIndex);
        }
    }

    function executeTransaction(uint256 txIndex) internal txExists(txIndex) notExecuted(txIndex) {
        Transaction storage transaction = transactions[txIndex];
        require(transaction.confirmations >= requiredConfirmations, "Not enough confirmations");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction failed");
        emit ExecuteTransaction(msg.sender, txIndex);
    }

    function revokeConfirmation(uint256 txIndex) external onlyOwner txExists(txIndex) notExecuted(txIndex) {
        Transaction storage transaction = transactions[txIndex];
        require(transaction.isConfirmed[msg.sender], "Transaction not confirmed");

        transaction.isConfirmed[msg.sender] = false;
        transaction.confirmations -= 1;
        emit RevokeConfirmation(msg.sender, txIndex);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 txIndex) external view returns (address, uint256, bool, uint256) {
        Transaction storage transaction = transactions[txIndex];
        return (transaction.to, transaction.value, transaction.executed, transaction.confirmations);
    }
}
