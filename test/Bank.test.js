const assert = require("assert"); //for test
const ganache = require("ganache-cli"); //serve as local network
const Web3 = require("web3"); //it is capitalise because it is constructor
const web3 = new Web3(ganache.provider()); //create an instance
web3.currentProvider.setMaxListeners(300);
const { interface, bytecode } = require("../compile");

let bank;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  bank = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("BankNegara Contract", () => {
  //to see all object in the smart contract
  it("deploy a contract", () => {
    console.log(bank);
  });

  //to check that contract is succefully or not
  it("deploy a contract", () => {
    assert.ok(bank.options.address);
  });

  //to deposit the money
  it("allow to deposit", async () => {
    await bank.methods.deposit({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether")
    });
  });

  //to withdraw the money
  it("allow to withdraw", async () => {
    await bank.methods.withdraw({
      from: accounts[1],
      value: web3.utils.toWei("1", "ether")
    });
  });

  // to get balance the smart contract
  it("get balance in the smart contract", () => {
    assert.ok(bank.methods.getBalance());
  });
});
