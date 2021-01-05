const path = require("path"); //declare path
const fs = require("fs"); //declare file sync
const solc = require("solc"); //declare solidity compiler

const bankPath = path.resolve(__dirname, "contracts", "BankNegara.sol"); //create inbox path
const source = fs.readFileSync(bankPath, "utf8"); //read the file

module.exports = solc.compile(source, 1).contracts[":BankNegara"];

//import abi and byte
