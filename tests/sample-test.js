const { expect } = require("chai");

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const Greeter = await ethers.getContractFactory("CompoundingAVAX");
    const greeter = await Greeter.deploy("Yield Yak: Compounding AVAX", "AVAX_CNR", "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", "0x8d88e48465f30acfb8dac0b3e35c9d6d7d36abaf","0x967fea7074ba54e8dad60a9512b1ecdc89d98453","0x5a2Be3Aa5Ed59cc120C1Aee2f03146dE02DfC280","0x8d36c5c6947adccd25ef49ea1aac2ceacfff0bd7", "1000000000000000000000", 200,300,500);
    await greeter.deployed();

    //expect(await greeter.depositAVAX()).to.equal("Hello, world!");
    const [owner, addr1] = await ethers.getSigners();
    //await greeter.connect(addr1).depositAVAX("Hallo, Erde!");
    const setGreetingTx = await greeter.depositAVAX(addr1,"70000000000000000000");
    
    // wait until the transaction is mined
    await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

// function Withdraw(address strategyContract, uint amountAVAX) external {
//   //(bool success,) = strategyContract.delegatecall(abi.encodeWithSelector("withdraw(uint)", amountAVAX));
//   //(bool success,) = strategyContract.delegatecall(abi.encodeWithSelector(bytes4(keccak256("withdraw(uint256)")), amountAVAX));
//   (bool success,) = strategyContract.delegatecall(
//       abi.encodeWithSignature(
//           "withdraw(uint256)",
//           amountAVAX
//       )
//   );
//   require(success);
//   // _contract.delegatecall(
//   // abi.encodeWithSignature("setVars(uint256)", _num)
//   //YakStrategy(strategyContract).withdraw(amountAVAX);
// }