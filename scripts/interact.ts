import { ethers } from "hardhat";
const { API_URL, PRIVATE_KEY, API_KEY }: any = process.env;
import GreeterAbi from "../artifacts/contracts/Greeter.sol/Greeter.json";

// Transaction hash
// https://sepolia.etherscan.io/tx/0xb47fd77e234267f25eaae968e7c061b4aa78196591cb59393a483c61e42118f0

async function main() {
  // Fetch accounts from wallet - these are unlocked
  const accounts = await ethers.getSigners();

  const provider = new ethers.AlchemyProvider("sepolia", API_KEY);
  const signer: any = new ethers.Wallet(PRIVATE_KEY, provider);
  // Fetch  network
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using chainId:", chainId);

  // Fetch deployed Greeter
  const GreeterContract = new ethers.Contract(
    "0x31E90c09Ccf388c6b8390FE7937FDC6C10A0564a",
    GreeterAbi.abi,
    signer
  );

  // Set a new greeting
  const setGreetingTx = await GreeterContract.setGreeting(
    "Hello, Web3bridgers!"
  );
  await setGreetingTx.wait();
  console.log("Greeting updated!");

  // Get the updated greeting
  const greeting = await GreeterContract.getGreeting();
  console.log("Current Greeting:", greeting);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
