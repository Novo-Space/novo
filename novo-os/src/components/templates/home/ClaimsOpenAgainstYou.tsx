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
  zip,
} from "utils/helpers";
import { useAccount, useBlockNumber, useContractReads } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

import { InfoOutlineIcon } from "@chakra-ui/icons";

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

const ClaimsOpenAgainstYou = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const readContracts = tokenList.map((token: any) => ({
    address: token.address,
    abi: werc20.abi,
    functionName: "getDebtIMayOwe",
    args: [address],
  }));

  // balance INFO
  const {
    data: debtIMayOweData,
    isError: debtIMayOweIsError,
    isLoading: debtIMayOweIsLoading,
    error: debtIMayOweError,
  } = useContractReads({
    contracts: readContracts,
    watch: true,
  });

  console.log("DEBT I MAY OWE DATA");
  console.log(debtIMayOweData);
  console.log(debtIMayOweIsError, debtIMayOweError);

  const flattenedSpenditureData = debtIMayOweData
    ? zip(debtIMayOweData, tokenList).flatMap(
        ([debtIMayOwes, ti]: [any, any]) => {
          return debtIMayOwes
            ? debtIMayOwes.map((debtIMayOwe: any, index: number) => {
                const [from, to, amount, claimID, status] = debtIMayOwe;
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
        }
      )
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
          Claims of Others Open Against You With Probable Cause
        </Text>
        <Tooltip label="This table shows open claims against you for which probable cause has been established and further investigation is underway. The assets associated with this claim are frozen until a verdict is reached.">
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
            <Th isNumeric>Claim ID</Th>
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
                    <Th>{formatAddress(from)}</Th>
                    <Th>{formatAddress(to)}</Th>
                    <Th isNumeric>{parseBigTokenToNumber(amount, ti)}</Th>
                    {/* <Th isNumeric>
                      {Math.trunc(blockNumber.toNumber() / 1000)}
                    </Th> */}
                    <Th isNumeric>
                      <Copiable
                        display={formatAddress(claimID)}
                        copy={claimID}
                      />
                    </Th>
                    <Th isNumeric>{status.toNumber()}</Th>
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

export default ClaimsOpenAgainstYou;
