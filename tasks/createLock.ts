import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";

export default async function(taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) {
    const {ethers} = hre;
    const votingEscrow = await (
        await ethers.getContractFactory("VotingEscrow")
    ).attach((await hre.deployments.get("VotingEscrow")).address);
    const token = await (
        await ethers.getContractFactory("TestToken")
    ).attach(taskArgs.token ? taskArgs.token : (await hre.deployments.get("TestToken")).address);

    const blockNo =  ethers.provider.blockNumber;
    const block = await ethers.provider.getBlock(blockNo);
    console.log("Block time now", block.timestamp);
    const qty = ethers.utils.parseEther(taskArgs.qty);
    console.log("Tokens", qty.toString(), "mintime", taskArgs.mintime);
    console.log(votingEscrow.address, token.address);

    const signers = await ethers.getSigners();

    await (
        await token.approve(
            votingEscrow.address,
            qty
        )
    ).wait()
   
    let tx = await (
        await votingEscrow.create_lock(
            qty.toString(),
            taskArgs.mintime
        )
    ).wait()
    console.log(`✅ Tx Completed [${hre.network.name}]`)
    console.log(`tx: ${tx.transactionHash}`);

    const tokenBalance = await token.balanceOf(signers[0].address);
    const veBalance = await votingEscrow.balanceOf(signers[0].address);
    console.log("Token Balance", ethers.utils.formatEther(tokenBalance));
    console.log("ve Balance", ethers.utils.formatEther(veBalance));
}