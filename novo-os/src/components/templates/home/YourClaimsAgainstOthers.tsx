import {
  Heading,
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
import {
  Copiable,
  formatAddress,
  parseBigTokenToNumber,
  statusToText,
  zip,
} from "utils/helpers";
import { useAccount, useBlockNumber, useContractReads } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { InfoOutlineIcon } from "@chakra-ui/icons";

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

const YourClaimsAgainstOthers = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const readContracts = tokenList.map((token: any) => ({
    address: token.address,
    abi: werc20.abi,
    functionName: "getDebtIMayGet",
    args: [address],
  }));

  // balance INFO
  const {
    data: debtIMayGetData,
    isError: debtIMayGetIsError,
    isLoading: debtIMayGetIsLoading,
    error: debtIMayGetError,
  } = useContractReads({
    contracts: readContracts,
    watch: true,
  });

  console.log("DEBT I MAY GET");
  console.log(debtIMayGetData);

  const flattenedSpenditureData = debtIMayGetData
    ? zip(debtIMayGetData, tokenList)
        .flatMap(([debtIMayGets, ti]: [any, any]) => {
          return debtIMayGets
            ? debtIMayGets.map((debtIMayGet: any, index: number) => {
                const [from, to, amount, claimID, status] = debtIMayGet;
                return {
                  from,
                  to,
                  amount,
                  claimID,
                  status,
                  blockNumber,
                  index,
                  ti,
                };
              })
            : [];
        })
        .reverse()
    : [];

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
        <Text style={{ fontWeight: "bold" }}>
          Your Requests to Reclaim Money From Others
        </Text>
        <Tooltip label="This table shows requests you've made to reclaim money from others for an erroneous transaction. The status column indicates whether the request is waiting for probable cause, waiting for a verdict, has been accepted, or has been rejected.">
          <InfoOutlineIcon style={{ marginLeft: "6px" }} />
        </Tooltip>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
            <Th>Token</Th>
            <Th>Reclaiming Money From</Th>
            {/* <Th>From</Th>
            <Th>To</Th> */}
            <Th isNumeric>Amount</Th>
            {/* <Th isNumeric>Claim ID</Th> */}
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {flattenedSpenditureData.length != 0 &&
            flattenedSpenditureData.map(
              ({
                from,
                to,
                amount,
                claimID,
                status,
                blockNumber,
                index,
                ti,
              }: any) => {
                return (
                  <Tr>
                    <Th>{ti.name}</Th>
                    {/* <Th>{formatAddress(from)}</Th> */}
                    <Th>
                      <Copiable display={formatAddress(from)} copy={from} />
                    </Th>
                    <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                    {/* <Th isNumeric>
                      {Math.trunc(blockNumber.toNumber() / 1000)}
                    </Th> */}
                    {/* <Th isNumeric>
                      <Copiable
                        display={formatAddress(claimID)}
                        copy={claimID}
                      />
                    </Th> */}
                    <Th isNumeric>{statusToText(status.toNumber())}</Th>
                    {/* <Th isNumeric>
                      <IconButton
                        aria-label="Request Reversal Button"
                        icon={<SlLoop />}
                      />
                    </Th> */}
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

export default YourClaimsAgainstOthers;
