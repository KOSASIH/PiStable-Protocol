// tests/contracts/PiStable.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PiStable Contract', function () {
    let PiStable;
    let piStable;
    let owner;
    let addr1;

    beforeEach(async function () {
        PiStable = await ethers.getContractFactory('PiStable');
        [owner, addr1] = await ethers.getSigners();
        piStable = await PiStable.deploy();
        await piStable.deployed();
    });

    it('Should mint tokens to the owner', async function () {
        const initialSupply = await piStable.totalSupply();
        expect(await piStable.balanceOf(owner.address)).to.equal(initialSupply);
    });

    it('Should allow users to burn tokens', async function () {
        await piStable.connect(owner).burn(100);
        expect(await piStable.balanceOf(owner.address)).to.equal(999900); // Assuming initial supply is 1,000,000
    });

    it('Should not allow non-owners to mint tokens', async function () {
        await expect(piStable.connect(addr1).mint(addr1.address, 100)).to.be.revertedWith('Ownable: caller is not the owner');
    });
});
