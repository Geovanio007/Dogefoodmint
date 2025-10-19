import React, { useState, useEffect } from 'react';
import { Wallet, Package, Clock, Users, Shield, Twitter, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import CountdownTimer from '../components/CountdownTimer';
import WhitelistChecker from '../components/WhitelistChecker';
import NFTCarousel from '../components/NFTCarousel';
import { CONTRACT_INFO } from '../mock';
import axios from 'axios';

const HomePage = () => {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [dogePrice, setDogePrice] = useState(null);
  const [minting, setMinting] = useState(false);

  // Fetch DOGE price from CoinGecko
  useEffect(() => {
    const fetchDogePrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&include_24hr_change=true'
        );
        setDogePrice(response.data.dogecoin);
      } catch (error) {
        console.error('Error fetching DOGE price:', error);
      }
    };

    fetchDogePrice();
    const interval = setInterval(fetchDogePrice, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  // Connect wallet (mock for now)
  const connectWallet = async () => {
    // In production, this will connect to MetaMask
    // For now, mock connection
    const mockAddress = '0xA2379150A951733aBab8a79dEbfaEAa5f6194A66';
    setConnectedWallet(mockAddress);
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
  };

  const handleMint = async () => {
    if (!connectedWallet) {
      alert('Please connect your wallet first!');
      return;
    }

    setMinting(true);
    // Mock minting process
    setTimeout(() => {
      alert('Minting will be enabled when the countdown reaches zero!');
      setMinting(false);
    }, 1000);
  };

  const StatCard = ({ icon: Icon, label, value, highlight = false }) => (
    <div className={`relative group ${
      highlight ? 'bg-gradient-to-br from-gold-500/20 to-amber-500/20' : 'bg-slate-800/50'
    } backdrop-blur-sm rounded-2xl p-6 border-2 ${
      highlight ? 'border-gold-400/50' : 'border-white/10'
    } hover:border-gold-400/50 transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          highlight ? 'bg-gold-400/20' : 'bg-white/5'
        }`}>
          <Icon className={`w-8 h-8 ${
            highlight ? 'text-gold-400' : 'text-white/80'
          }`} />
        </div>
        <div>
          <div className="text-white/60 text-sm font-medium">{label}</div>
          <div className={`text-2xl font-bold ${
            highlight ? 'text-gold-400' : 'text-white'
          }`}>{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 py-4">
          {/* DOGE Price Ticker */}
          {dogePrice && (
            <div className="bg-gradient-to-r from-gold-400/10 to-amber-500/10 border border-gold-400/30 rounded-full px-6 py-2 mb-4 flex items-center justify-center gap-4">
              <span className="text-white/80 text-sm font-medium">DOGE Live Price:</span>
              <span className="text-gold-400 text-lg font-bold">
                ${dogePrice.usd.toFixed(6)}
              </span>
              <span className={`text-sm font-medium ${
                dogePrice.usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {dogePrice.usd_24h_change >= 0 ? '▲' : '▼'} {Math.abs(dogePrice.usd_24h_change).toFixed(2)}%
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DogeFood</h1>
                <p className="text-xs text-white/60">NFT Collection</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-white/80">
              <a href="#about" className="hover:text-gold-400 transition-colors font-medium">About</a>
              <a href="#collection" className="hover:text-gold-400 transition-colors font-medium">Collection</a>
              <a href="#whitelist" className="hover:text-gold-400 transition-colors font-medium">Whitelist</a>
              <a href="#faq" className="hover:text-gold-400 transition-colors font-medium">FAQ</a>
            </nav>

            {connectedWallet ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block bg-white/5 px-4 py-2 rounded-full text-white/80 text-sm">
                  {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-500 hover:to-amber-600 text-slate-900 font-bold shadow-lg hover:shadow-gold-400/50 transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block bg-gradient-to-r from-gold-400/20 to-amber-500/20 border border-gold-400/30 rounded-full px-6 py-2 text-gold-400 font-medium animate-bounce">
              🚀 Limited to 420 NFTs Only!
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 drop-shadow-2xl leading-tight">
              DogeFood NFT
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              The most delicious NFT collection on DogeOS. Only 420 exclusive boxes featuring unique Dogecoin-themed flavors!
            </p>

            {/* Countdown Timer */}
            <div className="mt-12">
              <CountdownTimer targetDate={CONTRACT_INFO.mintDate} />
            </div>

            {/* Mint Section */}
            <div className="mt-12 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-white/10 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <div className="text-white/60 text-sm mb-2">Mint Price</div>
                  <div className="text-5xl font-bold text-green-400">FREE</div>
                  <div className="text-white/50 text-sm mt-1">Gas fees only</div>
                </div>
                <div className="text-left">
                  <div className="text-white/60 text-sm mb-2">Max Per Wallet</div>
                  <div className="text-5xl font-bold text-gold-400">2 NFTs</div>
                  <div className="text-white/50 text-sm mt-1">For whitelisted wallets</div>
                </div>
              </div>

              <Button
                onClick={handleMint}
                disabled={minting || !connectedWallet}
                size="lg"
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-500 hover:to-amber-600 text-slate-900 shadow-xl hover:shadow-gold-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl"
              >
                {minting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-6 h-6 animate-spin" />
                    Minting...
                  </span>
                ) : !connectedWallet ? (
                  'Connect Wallet to Mint'
                ) : (
                  'Mint Now (Coming Soon)'
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Package} label="Total Supply" value="420" highlight />
            <StatCard icon={Clock} label="Mint Price" value="FREE" highlight />
            <StatCard icon={Shield} label="Max Per Wallet" value="2" />
            <StatCard icon={Users} label="Network" value="DogeOS" />
          </div>
        </section>

        {/* Whitelist Checker Section */}
        <section id="whitelist" className="container mx-auto px-4 py-16">
          <WhitelistChecker connectedWallet={connectedWallet} />
        </section>

        {/* NFT Carousel Section */}
        <section id="collection" className="container mx-auto px-4 py-16">
          <NFTCarousel />
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">About DogeFood NFT</h2>
            <div className="space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                DogeFood is a limited NFT collection of 420 unique cereal boxes celebrating Dogecoin culture. 
                Each box features exclusive artwork, rarity tiers, and secret ingredients.
              </p>
              <p>
                Minting on <span className="text-gold-400 font-bold">DogeOS Chikyu Testnet</span>, this is your chance 
                to be part of the OG drop. All NFTs will initially show a cover image, with the full reveal 
                happening on mainnet deployment.
              </p>
              <p className="text-gold-400 font-medium">
                Phase 1: Testnet Mint (Current) → Phase 2: Mainnet Launch & Full Reveal
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">DogeFood</span>
              </div>
              <p className="text-white/60 text-sm">The most delicious NFT collection on DogeOS. Only 420 will ever exist.</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-white/60 text-sm">
                <a href="{CONTRACT_INFO.faucetUrl}" target="_blank" rel="noopener noreferrer" className="block hover:text-gold-400 transition-colors">
                  Get Testnet DOGE
                </a>
                <a href="{CONTRACT_INFO.explorerUrl}" target="_blank" rel="noopener noreferrer" className="block hover:text-gold-400 transition-colors">
                  Block Explorer
                </a>
                <a href="https://docs.dogeos.com" target="_blank" rel="noopener noreferrer" className="block hover:text-gold-400 transition-colors">
                  DogeOS Docs
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Community</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-gold-400/20 rounded-full flex items-center justify-center text-white/80 hover:text-gold-400 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-gold-400/20 rounded-full flex items-center justify-center text-white/80 hover:text-gold-400 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-gold-400/20 rounded-full flex items-center justify-center text-white/80 hover:text-gold-400 transition-all">
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>© 2025 DogeFood NFT. All rights reserved. Built on DogeOS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;