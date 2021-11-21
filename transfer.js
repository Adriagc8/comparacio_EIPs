let tokenAddress = "0xDa5E6B7f172847d63676aA6aC51e108a06c2044D";
let toAddress = "0xc6246ACA6BA8991BFb810Ae064Fe2725fD1a4664";
let fromAddress = "0xDeCD84708c75258F8D491A324077fFd846C1884c";
const web3 = require('./web3.min.js')
// Use BigNumber
let decimals = web3.toBigNumber(18);
let amount = web3.toBigNumber(100);
let minABI = [
  // transfer
  {
    "inputs": [
        {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "transfer",
    "outputs": [
        {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
        }
    ],
    "stateMutability": "payable",
    "type": "function"
}
];
// Get ERC20 Token contract instance
//web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
let contract = web3.contract(minABI).at(tokenAddress);

//let contract = new web3.eth.contract(minABI, tokenAddress);
// calculate ERC20 token amount
let value = amount.mul(web3.toBN(10).pow(decimals));
// call transfer function
contract.methods.transfer(toAddress, value).send({from: fromAddress})
.on('transactionHash', function(hash){
  console.log(hash);
});