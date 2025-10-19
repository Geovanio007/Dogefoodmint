// Mock data for DogeFood NFT Frontend

export const NFT_BOXES = [
  {
    id: 1,
    name: "Boring Bone Crunch",
    flavor: "BORING BONE CRUNCH",
    rarity: "OG DROP",
    image: "https://customer-assets.emergentagent.com/job_efa20ae6-ebab-4547-a049-ba5ed4a3cb66/artifacts/uhps3y9w_20250717_0223_Boring%20Bone%20Crunch_simple_compose_01k0aw5m56ez9t29p4vgwhz1yv.png",
    description: "Puff! Puff! Testurf",
    secretIngredient: "Doge Derivatives",
    tier: "OG DROP"
  },
  {
    id: 2,
    name: "Falcon Feed",
    flavor: "FALCON FEED",
    rarity: "OG DROP",
    image: "https://customer-assets.emergentagent.com/job_efa20ae6-ebab-4547-a049-ba5ed4a3cb66/artifacts/l9y9baec_20250811_0305_Falcon%20Feed%20Cereal%20Box_simple_compose_01k2bah3jbeh7936v92b27h5fd.png",
    description: "AI Flavor Chip",
    secretIngredient: "AI Flavor Chip",
    tier: "OG DROP"
  },
  {
    id: 3,
    name: "Elon's Signature Kibble",
    flavor: "ELON'S SIGNATURE KIBBLE",
    rarity: "OG DROP",
    image: "https://customer-assets.emergentagent.com/job_efa20ae6-ebab-4547-a049-ba5ed4a3cb66/artifacts/24k1d5pl_20250821_2342_Elon%27s%20Signature%20Kibble_simple_compose_01k3797prcfqv9bd0dyaa9kyhk.png",
    description: "Blockchain Bits",
    secretIngredient: "Blockchain Bits",
    tier: "MOONLIGHT SILVER"
  },
  {
    id: 4,
    name: "DogeFood Original",
    flavor: "DOGE FLAVOR #011",
    rarity: "OG DROP",
    image: "https://customer-assets.emergentagent.com/job_efa20ae6-ebab-4547-a049-ba5ed4a3cb66/artifacts/3voq4aje_20250821_2344_DogeFood%20Cereal%20Box_simple_compose_01k379ce33e8zvk45ch2xp982q.png",
    description: "Memefied goodness",
    secretIngredient: "NONE",
    tier: "OG DROP"
  },
  {
    id: 5,
    name: "Rainbow Rocket",
    flavor: "DOGE FLAVOR #015",
    rarity: "OG DROP",
    image: "https://customer-assets.emergentagent.com/job_efa20ae6-ebab-4547-a049-ba5ed4a3cb66/artifacts/3y2p1htw_20250828_2302_DogeFood%20Rainbow%20Rocket_simple_compose_01k3s7s5jtesq8jajjyrx6w0z8.png",
    description: "To the moon!",
    secretIngredient: "NONE",
    tier: "OG DROP"
  }
];

// Mock whitelist addresses
export const WHITELIST_ADDRESSES = [
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

// Contract info (mock for now)
export const CONTRACT_INFO = {
  network: "DogeOS Testnet",
  chainId: 6281971,
  rpcUrl: "https://rpc.testnet.dogeos.com",
  explorerUrl: "https://blockscout.testnet.dogeos.com",
  faucetUrl: "https://faucet.testnet.dogeos.com",
  maxSupply: 420,
  mintPrice: 0, // FREE
  maxPerWallet: 2,
  mintDate: new Date("2025-11-11T18:00:00Z").getTime()
};