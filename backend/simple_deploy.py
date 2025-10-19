"""
Simple deployment script for DogeFood NFT Contract
This script provides the deployment information and instructions
"""

import json

# Contract deployment info (to be filled after manual deployment)
DEPLOYMENT_INFO = {
    "network": "DogeOS Testnet",
    "chainId": 6281971,
    "rpcUrl": "https://rpc.testnet.dogeos.com",
    "contractAddress": "0x0000000000000000000000000000000000000000",  # To be updated after deployment
    "abi": [],  # To be updated with actual ABI
    "explorerUrl": "https://blockscout.testnet.dogeos.com",
    "faucetUrl": "https://faucet.testnet.dogeos.com",
    "placeholderURI": "ipfs://bafkreibgnwut2uvdbzjaqszt5uqabf7nmyk74ligs5p3eqxautnuipbmde/",
    "whitelistedAddresses": [
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
    ]
}

def print_instructions():
    """Print deployment instructions"""
    print("=" * 60)
    print("DogeFood NFT - Deployment Instructions")
    print("=" * 60)
    print("\n📋 DEPLOYMENT OPTIONS:\n")
    print("Option 1: Using Remix IDE (Easiest)")
    print("  1. Go to https://remix.ethereum.org")
    print("  2. Upload DogeFoodNFT.sol")
    print("  3. Install @openzeppelin/contracts")
    print("  4. Compile with Solidity 0.8.20")
    print("  5. Deploy to DogeOS Testnet")
    print("     - Network: DogeOS Chiky\u016b Testnet")
    print("     - RPC: https://rpc.testnet.dogeos.com")
    print("     - Chain ID: 6281971")
    print("     - Private Key: 911a03e6c1044d174d3e3b867f13b088fa4c8fde0b7e03290e224eb733771bb0")
    print("  6. After deployment, call setWhitelist() with addresses\n")
    
    print("Option 2: Using Hardhat")
    print("  1. Fix Node.js/Hardhat compatibility issues")
    print("  2. Run: npx hardhat run scripts/deploy.js --network dogeos_testnet\n")
    
    print("\n\u26a0\ufe0f  IMPORTANT:")
    print("  - Get testnet DOGE from: https://faucet.testnet.dogeos.com")
    print("  - Deployer address:", "0x...")  # Derive from private key
    print("\n" + "=" * 60)

if __name__ == "__main__":
    print_instructions()
    
    # Save deployment template
    with open('/app/backend/deployment_template.json', 'w') as f:
        json.dump(DEPLOYMENT_INFO, f, indent=2)
    
    print("\n✅ Deployment template saved to deployment_template.json")
    print("📝 Update this file after deploying the contract\n")
