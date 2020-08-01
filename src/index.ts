import Blockchain from "./Blockchain";
import Transaction from "./Transaction";
import { ec as EC } from "elliptic";

const ec = new EC("secp256k1");
const myKey = ec.keyFromPrivate(
  "23e96aebd9c493e0f020b4595b135b16a10fc012743a3db4d883086e06961f14"
);
const myWalletAddress = myKey.getPublic("hex");

const mirangsCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key", 10);
tx1.signTransaction(myKey);
mirangsCoin.addTransaction(tx1);

console.log("Starting the miner...");
mirangsCoin.minePendingTransactions(myWalletAddress);

console.log("Balance of mirangs: ", mirangsCoin.getBalanceOfAddress("mirangs"));
console.log(
  "Balance of address1: ",
  mirangsCoin.getBalanceOfAddress(myWalletAddress)
);

mirangsCoin.minePendingTransactions(myWalletAddress);
console.log(
  "Balance of mirangs: ",
  mirangsCoin.getBalanceOfAddress(myWalletAddress)
);
