// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract DogeFoodNFT is ERC721Enumerable, Ownable, ReentrancyGuard, Pausable {
    uint256 public constant MAX_SUPPLY = 420;
    uint256 public constant MAX_PER_WALLET_WL = 2;
    
    string private _baseTokenURI;
    bool public revealed = false;
    
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public mintedPerWallet;
    
    event Minted(address indexed to, uint256 tokenId);
    event Revealed(string newBaseURI);
    event WhitelistUpdated(address[] addresses, bool status);
    
    constructor(string memory placeholderURI) ERC721("DogeFood", "DOGEFOOD") {
        _baseTokenURI = placeholderURI;
    }
    
    function mint(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(whitelist[msg.sender], "Address not whitelisted");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(
            mintedPerWallet[msg.sender] + amount <= MAX_PER_WALLET_WL,
            "Exceeds max per wallet"
        );
        
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(msg.sender, tokenId);
            mintedPerWallet[msg.sender]++;
            emit Minted(msg.sender, tokenId);
        }
    }
    
    function setWhitelist(address[] calldata addresses, bool status) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = status;
        }
        emit WhitelistUpdated(addresses, status);
    }
    
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }
    
    function reveal(string memory newBaseURI) external onlyOwner {
        revealed = true;
        _baseTokenURI = newBaseURI;
        emit Revealed(newBaseURI);
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function isWhitelisted(address account) external view returns (bool) {
        return whitelist[account];
    }
    
    function getRemainingMintsForWallet(address wallet) external view returns (uint256) {
        if (!whitelist[wallet]) return 0;
        return MAX_PER_WALLET_WL - mintedPerWallet[wallet];
    }
}