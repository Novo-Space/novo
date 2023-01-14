import {
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
import { useAccount, useBlockNumber, useProvider } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Copiable,
  formatAddress,
  parseBigTokenToNumber,
  zip,
} from "utils/helpers";

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

const FrozenReversalRequests = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const { data: blockNumber } = useBlockNumber();

  const [allEvents, setAllEvents] = useState<any[]>([]);

  useEffect(() => {
    const updateEvents = async () => {
      if (blockNumber) {
        const queriedEvents = await Promise.all(
          tokenList.map(async (ti) => {
            const contract = new ethers.Contract(
              ti.address,
              werc20.abi,
              provider
            );
            const filter = contract.filters.FreezeSuccessful();
            const events = await contract.queryFilter(
              filter,
              blockNumber - 10_000,
              "latest"
            );
            return events;
          })
        );

        console.log(queriedEvents);
        setAllEvents(queriedEvents);
      }
    };

    updateEvents();
  }, [blockNumber]);

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
        <Text style={{ fontWeight: "bold" }}>Frozen Reversal Requests</Text>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
            <Th>Token</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>Block Number</Th>
            <Th isNumeric>Spenditure ID</Th>
            <Th isNumeric>Claim ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {zip(allEvents, tokenList).map(([events, ti]: [any, any]) => {
            return (
              events &&
              events.map((freezeSuccess: any, index: number) => {
                // address, address, bignumber, bignumber
                const [
                  from,
                  to,
                  amount,
                  blockNumber,
                  spenditureIndex,
                  claimId,
                ] = freezeSuccess.args;
                return (
                  <Tr>
                    <Th>{ti.name}</Th>
                    <Th>{formatAddress(from)}</Th>
                    <Th>{formatAddress(to)}</Th>
                    <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                    <Th isNumeric>{blockNumber.toNumber()}</Th>
                    <Th isNumeric>{spenditureIndex.toNumber()}</Th>
                    <Th isNumeric>
                      <Copiable
                        display={formatAddress(claimId)}
                        copy={claimId}
                      />
                      {/* // {formatAddress(claimId)}

                      // <IconButton
                      //   onClick={() => navigator.clipboard.writeText(claimId)}
                      //   aria-label="Request Reversal Button"
                      //   icon={<FiCopy />}
                      //   style={{ marginLeft: "6px" }}
                      //   size="xs"
                      // /> */}
                    </Th>
                  </Tr>
                );
              })
            );
          })}

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

export default FrozenReversalRequests;
