#![no_std]
use soroban_sdk::{contractimpl, symbol, vec, Env, Symbol, Vec, Address};

pub struct PiStable;

#[contractimpl]
impl PiStable {
    const STABLE_COIN_VALUE: u128 = 31415900; // Pegged value in cents ($314,159)
    const TOTAL_SUPPLY: u128 = 100_000_000_000; // Total supply of 100 billion tokens

    pub fn initialize(env: Env) {
        // Mint total supply to the contract owner
        let owner: Address = env.current_contract_address();
        env.storage().persistent().set(&symbol!("total_supply"), &0); // Initialize total supply to 0
        env.storage().persistent().set(&symbol!("owner"), &owner);
    }

    pub fn buy_stable_coins(env: Env, amount: u128) {
        let owner: Address = env.storage().persistent().get(&symbol!("owner")).unwrap();
        let total_supply: u128 = env.storage().persistent().get(&symbol!("total_supply")).unwrap();

        // Calculate the amount of stablecoins to mint
        let stablecoins_to_mint = (amount * Self::STABLE_COIN_VALUE) / 1_000_000_000_000_000_000; // Convert to wei

        // Ensure we do not exceed total supply
        assert!(total_supply + stablecoins_to_mint <= Self::TOTAL_SUPPLY, "Exceeds total supply");

        // Mint stablecoins (this is a placeholder for actual minting logic)
        env.storage().persistent().set(&symbol!("total_supply"), &(total_supply + stablecoins_to_mint));
    }

    pub fn get_stable_coin_value() -> u128 {
        Self::STABLE_COIN_VALUE
    }
}
