import { BigNumber } from "ethers";

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
//     address: contractAddresses.novoBridge,
//     abi: bridge.abi,
//     functionName: "getRev",
//     args: [contractAddresses.usdc],
//     watch: true,
//   });

//   console.log(
//     `Contract: ${contractAddresses.usdc}, address: ${address}, rev data: ${revData}, ${revIsError}, ${revIsLoading}, ${revError})
//     }`
//   );
