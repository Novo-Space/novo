import { ContractName, DeployMode } from "types";

const deployMode = process.env.NEXT_PUBLIC_DEPLOY_MODE!;

const contractAddressesByDeployMode: Record<
  DeployMode,
  Record<ContractName, string>
> = {
  goreli: {
    // Novo contract addresses
    novoBridge: "0x2B37d4f1E61eA513ad4680efb30F1E5001e70b64",
    // ERC-20 contract addresses
    usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    dai: "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
    weth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  },
};

export const contractAddresses =
  contractAddressesByDeployMode[deployMode as DeployMode];
