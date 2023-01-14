import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// import { BsWallet2 } from "react-icons/bs";
// import "erc20";
import { RiWallet3Line } from "react-icons/ri";
import { NUSDC_ADDRESS } from "utils/config";
import { formatAddress, parseBigTokenToNumber, zip } from "utils/helpers";
import { useAccount, useBlockNumber, useContractReads } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { SlLoop } from "react-icons/sl";

const tokenList = [
  // Novo tokens
  {
    name: "N-USD Coin",
    address: NUSDC_ADDRESS,
    symbol: "N-USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

const Spenditures = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const readContracts = tokenList.map((token: any) => ({
    address: token.address,
    abi: werc20.abi,
    functionName: "getSpenditures",
    args: [blockNumber && Math.trunc(blockNumber / 1000), address],
  }));

  // balance INFO
  const {
    data: spendituresData,
    isError: spendituresIsError,
    isLoading: spendituresIsLoading,
    error: spendituresError,
  } = useContractReads({
    contracts: readContracts,
    watch: true,
  });

  console.log("SPENDITURES DATA");
  console.log(spendituresData);

  return (
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
        <Text style={{ fontWeight: "bold" }}>Spenditures</Text>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
            <Th>Token</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>BlockNumber</Th>
            <Th isNumeric>Request Reversal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {spendituresData &&
            zip(spendituresData, tokenList).map(
              ([spenditures, ti]: [any, any]) => {
                return (
                  spenditures &&
                  spenditures.map((spenditure: any) => {
                    // address, address, bignumber, bignumber
                    const [from, to, amount, blockNumber] = spenditure;
                    return (
                      <Tr>
                        <Th>{ti.name}</Th>
                        <Th>{formatAddress(from)}</Th>
                        <Th>{formatAddress(to)}</Th>
                        <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                        <Th isNumeric>{blockNumber.toNumber()}</Th>
                        <Th isNumeric>
                          <IconButton
                            aria-label="Request Reversal Button"
                            icon={<SlLoop />}
                          />
                        </Th>
                      </Tr>
                    );
                  })
                );
              }
            )}

          {/* {data && (
              <Tr>
                <Td>0</Td>
              </Tr>
            )} */}

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
  );
};

export default Spenditures;
