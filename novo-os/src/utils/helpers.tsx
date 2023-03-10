import { IconButton, useToast } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import "react";
import { FiCopy } from "react-icons/fi";

// Convert big token to number
export const parseBigTokenToNumber = (bn: BigNumber, ti: any) =>
  bn ? bn.div(BigNumber.from(10).pow(ti.decimals - 2)).toNumber() / 100 : 0;

// Adjust amou
export const adjustAmountByDecimal = (amount: number, decimals: number) =>
  amount * 10 ** decimals;

//   // REV Address
//   const {
//     data: revData,
//     isError: revIsError,
//     isLoading: revIsLoading,
//     error: revError,
//   } = useContractRead({
//     address: config.novoBridge,
//     abi: bridge.abi,
//     functionName: "getRev",
//     args: [config.usdc],
//     watch: true,
//   });

//   console.log(
//     `Contract: ${config.usdc}, address: ${address}, rev data: ${revData}, ${revIsError}, ${revIsLoading}, ${revError})
//     }`
//   );

export const zip = (a: any, b: any) => a.map((k: any, i: any) => [k, b[i]]);

export const formatAddress = (address: string) =>
  `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;

export const Copiable = ({
  copy,
  display,
}: {
  copy: string;
  display: string;
}) => {
  const toast = useToast();
  return (
    <p>
      {display}
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(copy);

          toast({
            title: "Copied to clipboard",
            // description: "You successfully bridged funds into Novo Space",
            status: "success",
            duration: 50000,
            isClosable: true,
          });
        }}
        aria-label="Request Reversal Button"
        icon={<FiCopy />}
        style={{ marginLeft: "6px" }}
        size="xs"
      />
    </p>
  );
};

export const statusToText = (status: number) => {
  if (status == 0) {
    return "Awaiting Probable Cause";
  } else if (status == 1) {
    return "Awaiting Verdict";
  } else if (status == 2) {
    return "Reversal Request Accepted";
  } else {
    return "Reversal Request Denied";
  }
};
