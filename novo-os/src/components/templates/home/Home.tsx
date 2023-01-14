import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { config, NUSDC_ADDRESS } from "utils/config";

import { RiWallet3Line } from "react-icons/ri";
import { parseBigTokenToNumber, zip } from "utils/helpers";
import {
  useAccount,
  useBlockNumber,
  useContractRead,
  useContractReads,
} from "wagmi";
import erc20 from "../../../abis/erc20.json";
import ClaimsOpenAgainstYou from "./ClaimsOpenAgainstYou";
import Spenditures from "./Spenditures";
import YourClaimsAgainstOthers from "./YourClaimsAgainstOthers";

const tokenList = [
  // ERC-20 tokens
  {
    name: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  // Novo tokens
  {
    name: "N-USDC",
    address: NUSDC_ADDRESS,
    symbol: "N-USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

const Home = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  // balance INFO
  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    error: balanceError,
  } = useContractRead({
    address: config.USDC,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  // Get balances
  const contracts = tokenList.map((token: any) => ({
    address: token.address,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
  }));

  const { data, isError, isLoading, error, status } = useContractReads({
    contracts: contracts,
  });

  console.log(data, isError, isLoading, error, status);

  const netWorth = data
    ? zip(data, tokenList).reduce((a: number, [d, ti]: [BigNumber, any]) => {
        return a + parseBigTokenToNumber(d, ti);
      }, 0)
    : 0;

  return (
    <Container
      maxW="container.lg"
      p={3}
      marginTop={100}
      paddingBottom={100}
      as="main"
      minH="70vh"
    >
      <Text marginBottom={8} style={{ fontSize: "30px" }}>
        <b>Novo</b> Dashboard
      </Text>

      <SimpleGrid columns={3} spacing={16}>
        <Card
          style={{
            backgroundColor: "white",
            borderRadius: "0px",
            width: "300px",
          }}
          variant="outlined"
        >
          <CardBody style={{ padding: "30px" }}>
            <Text marginBottom={2} style={{ fontSize: "20px" }}>
              Net Worth
            </Text>

            <Text style={{ fontSize: "42px", fontWeight: "bold" }}>
              ${netWorth}
            </Text>
          </CardBody>
        </Card>

        {/* <Card
          style={{
            backgroundColor: "white",
            borderRadius: "0px",
            width: "300px",
          }}
          variant="outlined"
        >
          <CardBody style={{ padding: "30px" }}>
            <Text marginBottom={2} style={{ fontSize: "20px" }}>
              Epoch
            </Text>

            <Text style={{ fontSize: "42px", fontWeight: "bold" }}>
              {blockNumber && Math.trunc(blockNumber / 1000)}
            </Text>
          </CardBody>
        </Card> */}
      </SimpleGrid>

      <TableContainer
        style={{
          backgroundColor: "white",
          marginTop: "40px",
          borderRadius: "0px",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RiWallet3Line style={{ fontSize: "20px", marginRight: "6px" }} />
          <Text style={{ fontWeight: "bold" }}>Wallet</Text>
        </div>
        <Table variant="simple">
          <Thead>
            <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
              <Th>Token</Th>
              <Th isNumeric>Balance</Th>
              {/* <Th isNumeric>RBalance</Th>
              <Th isNumeric>NRBalance</Th>
              <Th isNumeric>Frozen Balance</Th>
              <Th isNumeric>Total Balance</Th> */}
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {data && (
              <Tr>
                <Td>0</Td>
              </Tr>
            )} */}

            {data &&
              zip(data, tokenList).map(([d, ti]: [BigNumber, any]) => {
                if (d) {
                  const amount = parseBigTokenToNumber(d, ti);

                  return (
                    <Tr>
                      <Td>{ti.name}</Td>
                      <Td isNumeric>{amount}</Td>
                      {/* <Td isNumeric>0</Td>
                      <Td isNumeric>0</Td>
                      <Td isNumeric>{amount}</Td> */}
                      <Td isNumeric>$1.00</Td>
                      <Td isNumeric>${amount}</Td>
                    </Tr>
                  );
                }
              })}
            {/* <Tr>
              <Td>N-Dai</Td>
              <Td isNumeric>13.12</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>13.12</Td>
              <Td isNumeric>$1.00</Td>
              <Td isNumeric>$13.12</Td>
            </Tr>
            <Tr>
              <Td>N-USDC</Td>
              <Td isNumeric>7.23</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>7.23</Td>
              <Td isNumeric>$1.00</Td>
              <Td isNumeric>$7.23</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
      <Spenditures />
      <YourClaimsAgainstOthers />
      <ClaimsOpenAgainstYou />
    </Container>
  );
};

export default Home;
