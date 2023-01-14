import { Container, Text, VStack } from "@chakra-ui/react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { config } from "utils/config";
import { useSigner } from "wagmi";
const MY_TOKEN_LIST = [
  {
    name: "Wrapped Ethereum",
    address: config.WETH,
    symbol: "Weth",
    decimals: 18,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    name: "Dai Stablecoin",
    address: config.DAI,
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
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
    address: config.USDC,
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

const Home = () => {
  //   const jsonRpcEndpoint = `envConfig.rpcUrl`;
  //   const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint);
  //   const provider = new ethers.providers.Web3Provider(
  //     jsonRpcProvider as ethers.providers.JsonRpcFetchFunc
  //   );
  //   const provider = useProvider();
  const { data: signer } = useSigner();
  //   const web3 = new Web3

  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <div>
          <Text marginBottom={6} style={{ fontSize: "30px" }}>
            <b>Novo</b> Swap
          </Text>
          <div className="Uniswap">
            <SwapWidget
              tokenList={MY_TOKEN_LIST}
              jsonRpcUrlMap={{ 1: config.rpcUrl }}
              hideConnectionUI={true}
              //       provider={provider as any}
            />
          </div>
        </div>
      </VStack>
    </Container>
  );
};

export default Home;
