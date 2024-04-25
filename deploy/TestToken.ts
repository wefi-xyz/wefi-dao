import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    await deploy("TestToken", {
        from: deployer,
        args: [],
        skipIfAlreadyDeployed: true,
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["TestToken"]
