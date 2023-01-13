import { ContractName, DeployMode } from "types";

const deployMode = process.env.NEXT_PUBLIC_DEPLOY_MODE!;

const contractAddressesByDeployMode: Record<
  DeployMode,
  Record<ContractName, any>
> = {
  goreli: {
    // Novo contract addresses
    novoBridge: "0x25c0a2f0a077f537bd11897f04946794c2f6f1ef",
    //     novoBridge: "0xfcfe742e19790dd67a627875ef8b45f17db1dac6",

    // ERC-20 contract addresses
    //     usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dai: "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
    weth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",

    // Reversible token addresses
    nusdc: "0x6c0e9F485aAb53226c422aCA0Cdd709318dE339f",

    tokenList: [],
  },
  hardhat: {
    // Novo contract addresses
    novoBridge: "0x25c0a2f0a077f537bd11897f04946794c2f6f1ef",

    // ERC-20 contract addresses
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",

    // Reversible token addresses
    nusdc: "0x6c0e9F485aAb53226c422aCA0Cdd709318dE339f",

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
  },
};

export const contractAddresses =
  contractAddressesByDeployMode[deployMode as DeployMode];
