import SHA256 from "crypto-js/sha256";
import { ec as EC } from "elliptic";

class Transaction {
  constructor(
    public fromAddress: string | null = "",
    public toAddress: string,
    public amount: number,
    public signature: string = ""
  ) {}

  calculateHash() {
    return SHA256(
      this.fromAddress || "",
      this.toAddress,
      this.amount
    ).toString();
  }

  signTransaction(signinKey: EC.KeyPair) {
    if (signinKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("Cannot sign transactions from other wallets");
    }

    const hashTx = this.calculateHash();
    const sig = signinKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || !this.signature.length) {
      throw new Error("No signature in this transaction");
    }

    const ec = new EC("secp256k1");
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export default Transaction;
