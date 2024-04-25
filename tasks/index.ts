import { task } from "hardhat/config";
import createLock from "./createLock";

task(
    "createLock",
    "Lock token and receive veTokens",
    createLock
).addParam("qty", "qty of tokens to lock")
.addParam("mintime", "minimum lock tmime in seconds")
.addParam("token", "address of token to lock");