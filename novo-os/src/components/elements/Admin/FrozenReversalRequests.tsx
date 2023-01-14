import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { prepareWriteContract, writeContract } from "@wagmi/core";

// import { BsWallet2 } from "react-icons/bs";
// import "erc20";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { RiWallet3Line } from "react-icons/ri";
import { NUSDC_ADDRESS } from "utils/config";
import { readContracts, useAccount, useBlockNumber, useProvider } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Copiable,
  formatAddress,
  parseBigTokenToNumber,
  statusToText,
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
        const queriedEvents = (
          await Promise.all(
            tokenList.map(async (ti) => {
              const contract = new ethers.Contract(
                ti.address,
                werc20.abi,
                provider
              );
              const filter = contract.filters.RequestSuccessful();
              // List of request successful events
              const events = await contract.queryFilter(
                filter,
                blockNumber - 10_000,
                "latest"
              );

              const froms = [
                ...new Set(
                  events.map((event) => {
                    const [
                      from,
                      to,
                      amount,
                      blockNumber,
                      spenditureIndex,
                      claimId,
                    ] = event.args!;
                    return from;
                  })
                ),
              ];

              const werc20Contract = {
                address: ti.address,
                abi: werc20.abi,
              };

              const debtIMayOwes = await readContracts({
                contracts: froms.map((from) => ({
                  ...werc20Contract,
                  functionName: "getDebtIMayGet",
                  args: [from],
                })),
              });
              console.log(debtIMayOwes);

              const debtIMayOwesObject = Object.fromEntries(
                zip(froms, debtIMayOwes)
              );

              const eventsAndStatus: any = events.map((event) => {
                const [
                  from,
                  to,
                  amount,
                  blockNumber,
                  spenditureIndex,
                  claimId,
                ] = event.args!;
                const matchedDebt = debtIMayOwesObject[from].find(
                  (debt: any) => {
                    const [debtFrom, to, amount, claimID, status] = debt;
                    return from == to;
                  }
                );
                console.log("MATCHED DEBT");
                console.log(from);
                console.log(matchedDebt);

                const [debtFrom, toDebt, amountDebt, claimID, status] =
                  matchedDebt;

                return [event, ti, status];
              });

              return eventsAndStatus;
            })
          )
        ).flat();

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
            {/* <Th isNumeric>Block Number</Th>
            <Th isNumeric>Spenditure ID</Th> */}
            <Th isNumeric>Claim ID</Th>
            <Th isNumeric>Status</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allEvents.length != 0 &&
            allEvents.map((a) => {
              const [event, ti, status] = a;

              const [from, to, amount, blockNumber, spenditureIndex, claimId] =
                event.args!;
              return (
                <Tr>
                  <Th>{ti.name}</Th>
                  <Th>{formatAddress(from)}</Th>
                  <Th>{formatAddress(to)}</Th>
                  <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                  {/* <Th isNumeric>{blockNumber.toNumber()}</Th>
                    <Th isNumeric>{spenditureIndex.toNumber()}</Th> */}
                  <Th isNumeric>
                    <Copiable display={formatAddress(claimId)} copy={claimId} />
                  </Th>
                  <Th isNumeric>{statusToText(status.toNumber())}</Th>

                  <Th isNumeric>
                    {status == 0 ? (
                      <>
                        <Tooltip label="Freeze">
                          <IconButton
                            aria-label="Freeze"
                            icon={<AiOutlineCheck />}
                            size="xs"
                            onClick={async () => {
                              const freezeConfig = await prepareWriteContract({
                                address: ti.address,
                                abi: werc20.abi,
                                functionName: "freeze",
                                args: [claimId],
                              });
                              const data = await writeContract(freezeConfig);
                            }}
                          />
                        </Tooltip>

                        <Tooltip label="Release">
                          <IconButton
                            aria-label="Release"
                            icon={<AiOutlineClose />}
                            size="xs"
                            style={{ marginLeft: "2px" }}
                            // onClick={() =>
                            //   requestReversalSteps(ti.address, epoch, from, index)
                            // }
                          />
                        </Tooltip>
                      </>
                    ) : status == 1 ? (
                      <>
                        <Tooltip label="Reverse">
                          <IconButton
                            aria-label="Reverse"
                            icon={<AiOutlineCheck />}
                            size="xs"
                            onClick={async () => {
                              const freezeConfig = await prepareWriteContract({
                                address: ti.address,
                                abi: werc20.abi,
                                functionName: "reverse",
                                args: [claimId],
                              });
                              const data = await writeContract(freezeConfig);
                            }}
                          />
                        </Tooltip>

                        <Tooltip label="Reject">
                          <IconButton
                            aria-label="Reject"
                            icon={<AiOutlineClose />}
                            size="xs"
                            style={{ marginLeft: "2px" }}
                            onClick={async () => {
                              const freezeConfig = await prepareWriteContract({
                                address: ti.address,
                                abi: werc20.abi,
                                functionName: "rejectReverse",
                                args: [claimId],
                              });
                              const data = await writeContract(freezeConfig);
                            }}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>None</>
                    )}
                  </Th>
                </Tr>
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
