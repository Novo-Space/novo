// import { DeployMode } from "types";

import { ConfigKey } from "types";

// const deployMode = process.env.NEXT_PUBLIC_DEPLOY_MODE!;

// const configByDeployMode: Record<
//   DeployMode,
//   Record<ConfigKey, any>
// > = {
//   goreli: {
//     // Novo contract addresses
//     novoBridge: "0x01cf58e264d7578D4C67022c58A24CbC4C4a304E",
//     //     novoBridge: "0xfcfe742e19790dd67a627875ef8b45f17db1dac6",

//     // ERC-20 contract addresses
//     //     usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
//     USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//     DAI: "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
//     WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",

//     // Reversible token addresses
//     "N-USDC": NUSDC_ADDRESS,

//     tokenList: [],
//     tokenInfo: {},
//   },
//   hardhat: ,
// };

// export const config =
//   configByDeployMode[deployMode as DeployMode];

// Update when redeploying bridge and nusdc
export const NOVO_BRIDGE_ADDRESS = "0x75b0B516B47A27b1819D21B26203Abf314d42CCE";
export const NUSDC_ADDRESS = "0x9DE61a8C8Ed7182E5378A028cB9Ce74ce2BEe624";

export const config: Record<ConfigKey, any> = {
  // Novo contract addresses
  novoBridge: NOVO_BRIDGE_ADDRESS,
  numReversibleBlocks: 3,
  delayBlocks: 4,
  blockTime: 5000,

  // ERC-20 contract addresses
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",

  // Reversible token addresses
  "N-USDC": NUSDC_ADDRESS,

  tokenInfo: {
    // USDC
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
      name: "USD Coin",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    [NUSDC_ADDRESS]: {
      name: "NUSD Coin",
      address: NUSDC_ADDRESS,
      symbol: "N-USDC",
      decimals: 6,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    // DAI
    "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
      name: "Dai Stablecoin",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      decimals: 18,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
    // WETH
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": {
      name: "Wrapped Ethereum",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "Weth",
      decimals: 18,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
  },

  // Interested token list
  tokenList: [
    //       {
    //         name: "Wrapped Ethereum",
    //         address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    //         symbol: "Weth",
    //         decimals: 18,
    //         chainId: 1,
    //         logoURI:
    //           "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    //       },
    //       {
    //         name: "Dai Stablecoin",
    //         address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    //         symbol: "DAI",
    //         decimals: 18,
    //         chainId: 1,
    //         logoURI:
    //           "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    //       },
    //   {
    //     name: "Tether USD",
    //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //     symbol: "USDT",
    //     decimals: 6,
    //     chainId: 1,
    //     logoURI:
    //       "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    //   },
    {
      name: "USD Coin",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
      chainId: 1,
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
};
