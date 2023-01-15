import {
  Heading,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";

// import { BsWallet2 } from "react-icons/bs";
// import "erc20";
import { RiWallet3Line } from "react-icons/ri";
import { NUSDC_ADDRESS } from "utils/config";
import { formatAddress, parseBigTokenToNumber, zip } from "utils/helpers";
import { useAccount, useBlockNumber, useContractReads } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { InfoOutlineIcon } from "@chakra-ui/icons";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { SlLoop } from "react-icons/sl";

const tokenList = [
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

  const flattenedSpenditureData = spendituresData
    ? zip(spendituresData, tokenList)
        .flatMap(([spenditures, ti]: [any, any]) => {
          return spenditures
            ? spenditures.map((spenditure: any, index: number) => {
                const [from, to, amount, blockNumber] = spenditure;
                return {
                  from,
                  to,
                  amount,
                  blockNumber,
                  index,
                  ti,
                };
              })
            : [];
        })
        .reverse()
    : [];

  // const {
  //   config: requestReversalConfig,
  //   isError: requestReversalIsError,
  //   error: requestReversalError,
  // } = usePrepareContractWrite({
  //   address: debouncedAssetAddress,
  //   abi: erc20.abi,
  //   functionName: "requestReversal",
  //   args: [config.novoBridge, decimalAdjustedDebouncedAmount],
  // });

  // console.log("requestReversal INFO", requestReversalIsError, requestReversalError);

  // const { write: writerequestReversal } = useContractWrite({
  //   ...requestReversalConfig,
  //   onSuccess() {
  //     // Bridge the token
  //     console.log(`WRITE: ${write}`);
  //     write?.();
  //   },
  // });

  const requestReversalSteps = async (
    tokenAddress: string,
    epoch: number,
    from: string,
    index: number
  ) => {
    const requestReversalConfig = await prepareWriteContract({
      address: tokenAddress,
      abi: werc20.abi,
      functionName: "requestRevert",
      args: [epoch, from, index],
    });
    const data = await writeContract(requestReversalConfig);
    console.log(data);
  };

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
        <Text style={{ fontWeight: "bold" }}>Your Outbound Transactions</Text>
        <Tooltip label="This table shows your Novo token outflows and is helpful for monitoring for suspicious activity">
          <InfoOutlineIcon style={{ marginLeft: "6px" }} />
        </Tooltip>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
            <Th>Token</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Amount</Th>
            {/* <Th isNumeric>Epoch</Th>
            <Th isNumeric>Spenditure ID</Th> */}
            <Th isNumeric>Request Reversal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {flattenedSpenditureData.length != 0 &&
            flattenedSpenditureData.map(
              ({ from, to, amount, blockNumber, index, ti }: any) => {
                const epoch = Math.trunc(blockNumber.toNumber() / 1000);
                return (
                  <Tr>
                    <Th>{ti.name}</Th>
                    <Th>{formatAddress(from)}</Th>
                    <Th>{formatAddress(to)}</Th>
                    <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                    {/* <Th isNumeric>{epoch}</Th>
                    <Th isNumeric>{index}</Th> */}
                    <Th isNumeric>
                      <IconButton
                        aria-label="Request Reversal Button"
                        icon={<SlLoop />}
                        onClick={() =>
                          requestReversalSteps(ti.address, epoch, from, index)
                        }
                      />
                    </Th>
                  </Tr>
                );
              }
            )}
        </Tbody>
        {flattenedSpenditureData.length == 0 && (
          <TableCaption style={{ padding: "20px", margin: "0" }}>
            <Heading size="sm">None</Heading>
          </TableCaption>
        )}
      </Table>
    </TableContainer>
  );
};

export default Spenditures;
