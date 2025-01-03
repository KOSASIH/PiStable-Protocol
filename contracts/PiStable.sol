// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PiStable is ERC20, Ownable, Pausable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18; // 1 million tokens
    uint256 public pegValue = 314159; // Peg value in cents (i.e., $314.159)

    event PegValueUpdated(uint256 newPegValue);

    constructor() ERC20("PiStable", "PST") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner whenNotPaused {
        _mint(to, amount);
    }

    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
    }

    function setPegValue(uint256 newPegValue) external onlyOwner {
        pegValue = newPegValue;
        emit PegValueUpdated(newPegValue);
    }

    function getPegValue() external view returns (uint256) {
        return pegValue;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
