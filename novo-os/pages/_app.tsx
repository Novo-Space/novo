import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains } from "@wagmi/core";
import { foundry, goerli, mainnet } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { Default } from "components/layouts/Default";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    // arbitrum,
    // arbitrumGoerli,
    // avalanche,
    // avalancheFuji,
    // bsc,
    // bscTestnet,
    // fantom,
    // fantomTestnet,
    foundry,
    goerli,
    // hardhat,
    mainnet,
    // optimism,
    // optimismGoerli,
    // polygon,
    // polygonMumbai,
    // sepolia,
  ],
  [
    alchemyProvider({ apiKey: "nqrcMq4YFgwPJZYr-Md4hiuIUD94HHOy" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Novo OS",
  chains,
});

const client = createClient({
  provider,
  connectors,
  // webSocketProvider,
  autoConnect: true,
});

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
};

const theme = extendTheme({ config });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Default>
              <Head>
                <title>Novo OS</title>
              </Head>
              <Component {...pageProps} />
            </Default>
          </SessionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
