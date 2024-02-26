import { ethers } from "hardhat";

async function main() {
  const greeterFactory = await ethers.deployContract("GreeterFactory");

  await greeterFactory.waitForDeployment();

  console.log(`GreeterFactory deployed to ${greeterFactory.target}`);

  // Deploy a Greeter instance through the factory
  const tx = await greeterFactory.deployGreeter("Hello, Web3bridgers!");
  await tx.wait();

  const deployedGreeters = await greeterFactory.getDeployedGreetings();
  console.log("Deployed Greeter address:", deployedGreeters);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
