import os
import json
from web3 import Web3
from solcx import compile_standard, install_solc
import sys

# DogeOS Testnet Configuration
RPC_URL = "https://rpc.testnet.dogeos.com"
CHAIN_ID = 6281971
PRIVATE_KEY = "911a03e6c1044d174d3e3b867f13b088fa4c8fde0b7e03290e224eb733771bb0"

# Whitelist addresses
WHITELIST = [
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

# Placeholder metadata IPFS CID
PLACEHOLDER_URI = "ipfs://bafkreibgnwut2uvdbzjaqszt5uqabf7nmyk74ligs5p3eqxautnuipbmde"

def compile_contract():
    """Compile the Solidity contract"""
    print("Installing Solidity compiler...")
    install_solc('0.8.20')
    
    print("Reading contract file...")
    with open('/app/backend/contracts/DogeFoodNFT.sol', 'r') as file:
        contract_source = file.read()
    
    # Read OpenZeppelin contracts (we'll need to install them)
    print("Compiling contract...")
    
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"DogeFoodNFT.sol": {"content": contract_source}},
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                    }
                },
                "optimizer": {"enabled": True, "runs": 200}
            },
        },
        allow_paths=["/app/backend/contracts"]
    )
    
    return compiled_sol

def deploy_contract(web3, account, compiled_contract):
    """Deploy the contract to DogeOS Testnet"""
    print("\n=== Deploying Contract ===")
    
    contract_data = compiled_contract['contracts']['DogeFoodNFT.sol']['DogeFoodNFT']
    abi = contract_data['abi']
    bytecode = contract_data['evm']['bytecode']['object']
    
    # Create contract instance
    Contract = web3.eth.contract(abi=abi, bytecode=bytecode)
    
    # Build constructor transaction
    print(f"Constructor parameter: {PLACEHOLDER_URI}")
    constructor_txn = Contract.constructor(PLACEHOLDER_URI).build_transaction({
        'from': account.address,
        'nonce': web3.eth.get_transaction_count(account.address),
        'gas': 5000000,
        'gasPrice': web3.eth.gas_price,
        'chainId': CHAIN_ID
    })
    
    # Sign and send transaction
    print("Signing deployment transaction...")
    signed_txn = account.sign_transaction(constructor_txn)
    
    print("Sending deployment transaction...")
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaction hash: {tx_hash.hex()}")
    
    # Wait for receipt
    print("Waiting for transaction receipt...")
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash, timeout=300)
    
    contract_address = tx_receipt.contractAddress
    print(f"\n✅ Contract deployed at: {contract_address}")
    print(f"View on explorer: https://blockscout.testnet.dogeos.com/address/{contract_address}")
    
    return contract_address, abi

def setup_whitelist(web3, account, contract_address, abi):
    """Add addresses to whitelist"""
    print("\n=== Setting up Whitelist ===")
    
    contract = web3.eth.contract(address=contract_address, abi=abi)
    
    # Convert addresses to checksum format
    whitelist_checksum = [Web3.to_checksum_address(addr) for addr in WHITELIST]
    
    print(f"Adding {len(whitelist_checksum)} addresses to whitelist...")
    
    txn = contract.functions.setWhitelist(whitelist_checksum, True).build_transaction({
        'from': account.address,
        'nonce': web3.eth.get_transaction_count(account.address),
        'gas': 500000,
        'gasPrice': web3.eth.gas_price,
        'chainId': CHAIN_ID
    })
    
    signed_txn = account.sign_transaction(txn)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaction hash: {tx_hash.hex()}")
    
    print("Waiting for confirmation...")
    web3.eth.wait_for_transaction_receipt(tx_hash, timeout=300)
    print("✅ Whitelist updated successfully!")

def save_deployment_info(contract_address, abi):
    """Save contract info to JSON file"""
    deployment_info = {
        "network": "DogeOS Testnet",
        "chainId": CHAIN_ID,
        "rpcUrl": RPC_URL,
        "contractAddress": contract_address,
        "abi": abi,
        "explorerUrl": f"https://blockscout.testnet.dogeos.com/address/{contract_address}"
    }
    
    with open('/app/backend/deployment_info.json', 'w') as f:
        json.dump(deployment_info, f, indent=2)
    
    print("\n✅ Deployment info saved to deployment_info.json")

def main():
    try:
        print("=== DogeFood NFT Contract Deployment ===")
        print(f"Target Network: DogeOS Testnet")
        print(f"Chain ID: {CHAIN_ID}")
        print(f"RPC URL: {RPC_URL}\n")
        
        # Connect to DogeOS Testnet
        print("Connecting to DogeOS Testnet...")
        web3 = Web3(Web3.HTTPProvider(RPC_URL))
        
        if not web3.is_connected():
            raise Exception("Failed to connect to DogeOS Testnet")
        
        print("✅ Connected to DogeOS Testnet")
        
        # Setup account
        account = web3.eth.account.from_key(PRIVATE_KEY)
        print(f"Deployer address: {account.address}")
        
        balance = web3.eth.get_balance(account.address)
        print(f"Balance: {web3.from_wei(balance, 'ether')} DOGE\n")
        
        if balance == 0:
            print("⚠️  WARNING: Account has 0 balance!")
            print("Please get testnet DOGE from: https://faucet.testnet.dogeos.com")
            return
        
        # Compile contract
        # compiled_contract = compile_contract()
        
        # For now, we'll skip compilation and use pre-compiled version
        print("\n⚠️  Note: Contract needs to be compiled with OpenZeppelin dependencies")
        print("For production deployment, please:")
        print("1. Use Hardhat or Foundry for compilation")
        print("2. Install OpenZeppelin contracts")
        print("3. Compile and deploy\n")
        
        print("Deployment script is ready. To deploy:")
        print("1. Install Hardhat: cd /app/backend && npm init -y && npm install --save-dev hardhat")
        print("2. Setup Hardhat project")
        print("3. Install OpenZeppelin: npm install @openzeppelin/contracts")
        print("4. Run deployment")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()