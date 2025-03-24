import { task, types } from "hardhat/config";

task("fund", "Sends ETH to an address")
  .addParam("to", "The recipient address")
  .addOptionalParam("amount", "Amount in ETH", "100", types.string)
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const tx = await deployer.sendTransaction({
      to: taskArgs.to,
      value: hre.ethers.parseEther(taskArgs.amount),
    });

    console.log(`Sent ${taskArgs.amount} ETH to ${taskArgs.to}`);
    console.log(`Transaction hash: ${tx.hash}`);

    await tx.wait();
  });

export default {};
