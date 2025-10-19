import hre from "hardhat";
import fs from "fs";

// Whitelist addresses
const WHITELIST = [
  "0xA2379150A951733aBab8a79dEbfaEAa5f6194A66",
  "0x664186B0b57CAcb5359039db35F632b91a33ffFa",
  "0x642E2b6cbA637B7317dE8b68833f7efbb661ddE9",
  "0x2bDAaF7CEfEbb443F4667C119352231C7Fe5FF21",
  "0xd5E6fAb9b40de8d59Bd1140Da8A5C1d79c637a21",
  "0x32d18464FaCab1F451140decC88220166B69Cb6c",
  "0xC0c972f6c040f32E9cC73316Bdf1f4654aaA7e35",
  "0x11bd339C05b0623cF8f7E990e35b490Cc00E67c0",
  "0xa27B536D5D8250c2ECd4342F55E3712330af4a3C",
  "0x478500A38431090F0dF908Ce4438854d08B7020F",
  "0x9567a4ad15C55808679a4C5369B6ACC4c2bdAbb6"
];

// Placeholder metadata IPFS CID
const PLACEHOLDER_URI = "ipfs://bafkreibgnwut2uvdbzjaqszt5uqabf7nmyk74ligs5p3eqxautnuipbmde/";

async function main() {
  console.log("\n=== DogeFood NFT Deployment to DogeOS Testnet ===");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("\nDeploying contract with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "DOGE");
  
  if (balance === 0n) {
    console.log("\n⚠️  WARNING: Account has 0 balance!");
    console.log("Get testnet DOGE from: https://faucet.testnet.dogeos.com");
    return;
  }
  
  // Deploy contract
  console.log("\n⏳ Deploying DogeFoodNFT contract...");
  const DogeFoodNFT = await hre.ethers.getContractFactory("DogeFoodNFT");
  const dogefoodNFT = await DogeFoodNFT.deploy(PLACEHOLDER_URI);
  
  await dogefoodNFT.waitForDeployment();
  const contractAddress = await dogefoodNFT.getAddress();
  
  console.log("\n✅ DogeFood NFT deployed to:", contractAddress);
  console.log("Explorer:", `https://blockscout.testnet.dogeos.com/address/${contractAddress}`);
  
  // Wait for a few confirmations
  console.log("\n⏳ Waiting for confirmations...");
  await dogefoodNFT.deploymentTransaction().wait(3);
  
  // Setup whitelist
  console.log("\n⏳ Setting up whitelist...");
  const tx = await dogefoodNFT.setWhitelist(WHITELIST, true);
  await tx.wait();
  console.log("✅ Whitelist configured with", WHITELIST.length, "addresses");
  
  // Get contract info
  const totalSupply = await dogefoodNFT.totalSupply();
  const maxSupply = await dogefoodNFT.MAX_SUPPLY();
  const maxPerWallet = await dogefoodNFT.MAX_PER_WALLET_WL();
  
  console.log("\n=== Contract Info ===");
  console.log("Contract Address:", contractAddress);
  console.log("Total Supply:", totalSupply.toString());
  console.log("Max Supply:", maxSupply.toString());
  console.log("Max Per Wallet (WL):", maxPerWallet.toString());
  
  // Save deployment info
  const deploymentInfo = {
    network: "DogeOS Testnet",
    chainId: 6281971,
    rpcUrl: "https://rpc.testnet.dogeos.com",
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    explorerUrl: `https://blockscout.testnet.dogeos.com/address/${contractAddress}`,
    placeholderURI: PLACEHOLDER_URI,
    maxSupply: maxSupply.toString(),
    maxPerWallet: maxPerWallet.toString(),
    whitelistedAddresses: WHITELIST.length,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "deployment_info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment info saved to deployment_info.json");
  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });