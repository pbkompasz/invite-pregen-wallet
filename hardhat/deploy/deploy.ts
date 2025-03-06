import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const DAY_IN_SECONDS = 60 * 60 * 24;
const NOW_IN_SECONDS = Math.round(Date.now() / 1000);
const UNLOCK_IN_X_DAYS = NOW_IN_SECONDS + DAY_IN_SECONDS * 1; // 1 DAY

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const giveaway = await deploy("GiveawayNFT", {
    from: deployer,
    args: [UNLOCK_IN_X_DAYS],
    log: true,
  });

  console.log(`contract: `, giveaway.address);
};
export default func;
func.id = "deploy_lock"; // id required to prevent reexecution
func.tags = ["Lock"];
