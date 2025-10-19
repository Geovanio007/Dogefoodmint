import React, { useState } from 'react';
import { CheckCircle2, XCircle, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { WHITELIST_ADDRESSES } from '../mock';

const WhitelistChecker = ({ connectedWallet }) => {
  const [inputAddress, setInputAddress] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const checkWhitelist = (address) => {
    const normalizedAddress = address.trim().toLowerCase();
    const isWhitelisted = WHITELIST_ADDRESSES.some(
      addr => addr.toLowerCase() === normalizedAddress
    );
    setCheckResult({
      address,
      whitelisted: isWhitelisted
    });
  };

  const handleCheck = () => {
    if (inputAddress) {
      checkWhitelist(inputAddress);
    }
  };

  // Auto-check when wallet connects
  React.useEffect(() => {
    if (connectedWallet) {
      checkWhitelist(connectedWallet);
    }
  }, [connectedWallet]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-3xl blur-xl"></div>
      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3
">Whitelist Checker</h2>
          <p className="text-white/60">Check if your wallet is eligible to mint</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            type="text"
            placeholder="Enter wallet address (0x...)" 
            value={connectedWallet || inputAddress}
            onChange={(e) => !connectedWallet && setInputAddress(e.target.value)}
            disabled={!!connectedWallet}
            className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 text-lg rounded-xl focus:ring-2 focus:ring-gold-400"
          />
          <Button
            onClick={handleCheck}
            disabled={!inputAddress && !connectedWallet}
            className="bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-500 hover:to-amber-600 text-slate-900 font-bold px-8 h-14 rounded-xl shadow-lg hover:shadow-gold-400/50 transition-all disabled:opacity-50"
          >
            <Search className="w-5 h-5 mr-2" />
            Check Status
          </Button>
        </div>

        {checkResult && (
          <div className={`p-6 rounded-2xl border-2 ${
            checkResult.whitelisted
              ? 'bg-green-500/10 border-green-500/50'
              : 'bg-red-500/10 border-red-500/50'
          } animate-in fade-in duration-500`}>
            <div className="flex items-center gap-4">
              {checkResult.whitelisted ? (
                <CheckCircle2 className="w-12 h-12 text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
              )}
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  checkResult.whitelisted ? 'text-green-400' : 'text-red-400'
                }`}>
                  {checkResult.whitelisted ? 'You are whitelisted!' : 'Not Whitelisted'}
                </h3>
                <p className="text-white/70 text-sm break-all">
                  {checkResult.whitelisted
                    ? 'You can mint up to 2 NFTs when minting opens!'
                    : 'Sorry, this wallet is not on the whitelist.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhitelistChecker;