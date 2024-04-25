import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const minTime = 2419200; // 4 weeks
    const tokenAddress = "0xfFA188493C15DfAf2C206c97D8633377847b6a52";
    await deploy("VotingEscrow", {
        from: deployer,
        args: [tokenAddress, minTime],
        skipIfAlreadyDeployed: false,
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["VotingEscrow"]
