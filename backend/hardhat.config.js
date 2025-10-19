import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config({ path: ".env.deployment" });

export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    dogeos_testnet: {
      url: process.env.DOGEOS_RPC_URL || "https://rpc.testnet.dogeos.com",
      chainId: parseInt(process.env.DOGEOS_CHAIN_ID) || 6281971,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      gasPrice: "auto",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};