import {
  Card,
  CardBody,
  Container,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BigNumberish, ethers } from "ethers";

// import { BsWallet2 } from "react-icons/bs";
// import "erc20";
import { RiWallet3Line } from "react-icons/ri";
import { contractAddresses } from "utils/contractAddresses";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import erc20 from "../../../abis/erc20.json";

const tokenList = [
  {
    name: "N-USD Coin",
    address: "0x6c0e9F485aAb53226c422aCA0Cdd709318dE339f",
    symbol: "N-USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

const Home = () => {
  const { address } = useAccount();

  // balance INFO
  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    error: balanceError,
  } = useContractRead({
    address: contractAddresses.usdc,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  // console.log(
  //   `Contract: ${contractAddresses.usdc}, address: ${address}, balance data: ${balanceData}, ${balanceIsError}, ${balanceIsLoading}, ${balanceError})
  //   }`
  // );

  // Get balances
  const contracts = tokenList.map((token: any) => ({
    address: token.address,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
  }));

  // const data = console.log("CONTRACTS");
  console.log(contracts);
  console.log(contractAddresses.tokenList);

  const { data, isError, isLoading, error, status, refetch } = useContractReads(
    {
      contracts: contracts,
      onSuccess: () => {
        console.log("SUCCESS FETCH");
      },
      onError: () => {
        console.log("ERRROR");
      },
      enabled: true,
    }
  );

  console.log(status);

  if (isError) {
    console.log("ERROR:");
    console.log(error);
  }

  console.log(isLoading);
  console.log("Balance data:");
  console.log(data);
  console.log(
    data?.map((value) => ethers.utils.formatEther(value as BigNumberish))
  );

  const zip = (a: any, b: any) => a.map((k: any, i: any) => [k, b[i]]);

  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <Text marginBottom={8} style={{ fontSize: "30px" }}>
        <b>Novo</b> Dashboard
      </Text>

      <Card
        style={{
          backgroundColor: "white",
          borderRadius: "0px",
          width: "300px",
        }}
        variant="outlined"
        onClick={() => refetch()}
      >
        <CardBody style={{ padding: "30px" }}>
          <Text marginBottom={2} style={{ fontSize: "20px" }}>
            Net Worth
          </Text>

          <Text style={{ fontSize: "42px", fontWeight: "bold" }}>
            $10,234.23
          </Text>
        </CardBody>
      </Card>

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
              <Th isNumeric>RBalance</Th>
              <Th isNumeric>NRBalance</Th>
              <Th isNumeric>Frozen Balance</Th>
              <Th isNumeric>Total Balance</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {data &&
              zip(data, tokenList).map((a: any) => {
                const [d, i] = a;
                const amount = (d as BigNumberish).toString();

                return (
                  <Tr>
                    <Td>{i.name}</Td>
                    <Td isNumeric>{amount}</Td>
                    <Td isNumeric>0</Td>
                    <Td isNumeric>0</Td>
                    <Td isNumeric>{amount}</Td>
                    <Td isNumeric>$1.00</Td>
                    <Td isNumeric>${amount}</Td>
                  </Tr>
                );
              })} */}
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
    </Container>
  );
};

export default Home;
