// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, DISPUTED }

    struct EscrowTransaction {
        address buyer;
        address seller;
        uint256 amount;
 State state;
    }

    mapping(uint256 => EscrowTransaction) public escrows;
    uint256 public escrowCount;

    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount);
    event PaymentReleased(uint256 indexed escrowId);
    event DisputeResolved(uint256 indexed escrowId, bool buyerWins);

    modifier onlyBuyer(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].buyer, "Only buyer can call this function");
        _;
    }

    modifier onlySeller(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].seller, "Only seller can call this function");
        _;
    }

    modifier inState(uint256 escrowId, State expectedState) {
        require(escrows[escrowId].state == expectedState, "Invalid state for this operation");
        _;
    }

    function createEscrow(address seller) external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        
        escrowCount++;
        escrows[escrowCount] = EscrowTransaction({
            buyer: msg.sender,
            seller: seller,
            amount: msg.value,
            state: State.AWAITING_DELIVERY
        });

        emit EscrowCreated(escrowCount, msg.sender, seller, msg.value);
    }

    function confirmDelivery(uint256 escrowId) external onlySeller(escrowId) inState(escrowId, State.AWAITING_DELIVERY) {
        EscrowTransaction storage escrow = escrows[escrowId];
        escrow.state = State.COMPLETE;

        payable(escrow.seller).transfer(escrow.amount);
        emit PaymentReleased(escrowId);
    }

    function dispute(uint256 escrowId) external onlyBuyer(escrowId) inState(escrowId, State.AWAITING_DELIVERY) {
        escrows[escrowId].state = State.DISPUTED;
    }

    function resolveDispute(uint256 escrowId, bool buyerWins) external onlyOwner inState(escrowId, State.DISPUTED) {
        EscrowTransaction storage escrow = escrows[escrowId];
        escrow.state = State.COMPLETE;

        if (buyerWins) {
            payable(escrow.buyer).transfer(escrow.amount);
        } else {
            payable(escrow.seller).transfer(escrow.amount);
        }

        emit DisputeResolved(escrowId, buyerWins);
    ```solidity
    }
}
