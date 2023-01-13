import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
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
import { ConfigKey } from "types";
import { config } from "utils/config";
import { parseBigTokenToNumber, zip } from "utils/helpers";
import { useAccount, useBlockNumber, useContractReads } from "wagmi";
import bridge from "../../../abis/bridge.json";

const tokenList = [
  // Novo tokens
  {
    name: "N-USD Coin",
    address: "0x4a2D095b33100C9A5742CA04B832a9b3e4577377",
    symbol: "N-USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

const BridgeOut = () => {
  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({ watch: true });

  // PENDING BRIDGE OUTS

  // Get pending bridge outs
  const contracts = tokenList.map((token: any) => ({
    address: config.novoBridge,
    abi: bridge.abi,
    functionName: "getwithdrawInfo",
    args: [address, config[token.symbol.substring(2) as ConfigKey]],
  }));

  const {
    data: pendingWithdrawalsData,
    isError,
    isLoading,
    error,
    status,
  } = useContractReads({
    contracts: contracts,
  });

  console.log(pendingWithdrawalsData);
  return (
    <Card
      style={{ backgroundColor: "white", borderRadius: "0px" }}
      variant="outlined"
    >
      <CardHeader>
        <Heading size="md">Pending Bridge Outs</Heading>
        <Text style={{ fontSize: "12px" }}>Block Number: {blockNumber}</Text>
      </CardHeader>

      <TableContainer pt="4">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Token</Th>
              <Th>Amount</Th>
              <Th isNumeric>Blocks Till Available</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingWithdrawalsData &&
              zip(pendingWithdrawalsData, tokenList).map(
                ([[amount, startBlock], ti]: [[BigNumber, BigNumber], any]) => {
                  if (amount && blockNumber && !amount.isZero()) {
                    const withdrawAmount = parseBigTokenToNumber(amount, ti);
                    const endBlock = startBlock.toNumber() + config.delayBlocks;

                    return (
                      <Tr>
                        <Td>{ti.name}</Td>
                        <Td isNumeric>{withdrawAmount}</Td>
                        <Td isNumeric>
                          {endBlock > blockNumber
                            ? endBlock - blockNumber
                            : "Available Now"}
                        </Td>
                      </Tr>
                    );
                  }
                }
              )}
          </Tbody>
        </Table>
      </TableContainer>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              style={{ fontWeight: "400" }}
            >
              Time Till Withdrawal Available
            </Heading>
            <Text pt="2" fontSize="sm">
              3 hours and 2 minutes
            </Text>
          </Box> */}
          {/* <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients.
            </Text>
          </Box> */}
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <Stack>
          {/* <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              style={{ fontWeight: "400" }}
            >
              Amount Ready for Withdrawal
            </Heading>
            <Text style={{ fontSize: "30px", fontWeight: "bold" }}>$10.23</Text>
          </Box> */}
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Claim Completed Withdrawals
            </Button>
          </ButtonGroup>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default BridgeOut;
