import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains } from "@wagmi/core";
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  foundry,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from "@wagmi/core/chains";
import { Default } from "components/layouts/Default";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
  ],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const theme = extendTheme({ config });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Default>
              <Component {...pageProps} />
            </Default>
          </SessionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
