import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains } from "@wagmi/core";

import ClientOnly from "components/layouts/ClientOnly";
import { Default } from "components/layouts/Default";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { config as envConfig } from "utils/config";
import { createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const hardhatMainnet = {
  id: 1,
  name: "Ethereum Testnet (Novo)",
  network: "hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: [envConfig.rpcUrl] },
  },
};

const { chains, provider, webSocketProvider } = configureChains(
  [hardhatMainnet, goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: envConfig.rpcUrl,
      }),
    }),
    // alchemyProvider({ apiKey: "nqrcMq4YFgwPJZYr-Md4hiuIUD94HHOy" }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Novo OS",
  chains,
});

const client = createClient({
  provider,
  connectors,
  webSocketProvider,
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
              <ClientOnly>
                <Component {...pageProps} />
              </ClientOnly>
            </Default>
          </SessionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
