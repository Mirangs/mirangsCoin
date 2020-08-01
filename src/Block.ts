import SHA256 from "crypto-js/sha256";
import Transaction from "./Transaction";

class Block {
  timestamp: number;
  transactions: Transaction[];
  prevHash: string;
  hash: string;
  nonce: number;

  constructor(timestamp: number, transactions: Transaction[], prevHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.prevHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: ", this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}

export default Block;
