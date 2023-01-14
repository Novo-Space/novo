import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { ConfigKey } from "types";
import { useDebounce } from "use-debounce";
import { config } from "utils/config";
import { adjustAmountByDecimal, parseBigTokenToNumber } from "utils/helpers";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import novoLogo from "../../../../public/android-chrome-512x512.png";
import bridge from "../../../abis/bridge.json";
import erc20 from "../../../abis/erc20.json";
const BridgeIn = () => {
  const toast = useToast();
  const { address } = useAccount();

  const [asset, setAsset] = useState("USDC");
  const assetAddress = config[asset as ConfigKey];
  const [debouncedAssetAddress] = useDebounce(assetAddress, 500);

  const [amount, setAmount] = useState("0");
  const [debouncedAmount] = useDebounce(amount, 500);
  const decimalAdjustedDebouncedAmount = adjustAmountByDecimal(
    parseInt(debouncedAmount),
    config.tokenInfo[debouncedAssetAddress].decimals
  );

  const {
    config: approveConfig,
    isError: approveIsError,
    error: approveError,
  } = usePrepareContractWrite({
    address: debouncedAssetAddress,
    abi: erc20.abi,
    functionName: "approve",
    args: [config.novoBridge, decimalAdjustedDebouncedAmount],
  });

  console.log("APPROVE INFO", approveIsError, approveError);

  const { write: writeApprove } = useContractWrite({
    ...approveConfig,
    onSuccess() {
      // Bridge the token
      console.log(`WRITE: ${write}`);
      write?.();
    },
  });

  const {
    write,
    data,
    error: prepareError,
    isError: isPrepareError,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: config.novoBridge,
    abi: bridge.abi,
    functionName: "BridgeIn",
    args: [debouncedAssetAddress, decimalAdjustedDebouncedAmount],
    onSuccess(data, variables, context) {
      toast({
        title: "Bridge in successful!",
        description: "You successfully bridged funds into Novo Space",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  //   const { data, error, isError, write } = useContractWrite(config);

  //   if (isPrepareError || isError) {
  //     console.log("WRITE ERROR", (prepareError || error)?.message);
  //   }

  //   console.log(`Is success: ${isSuccess}`);

  const bridgeInSteps = async () => {
    // Approve token for bridging
    console.log("WRITE APPROVE");
    console.log(writeApprove);
    writeApprove?.();
  };

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isSuccess) {
    console.log(`Bridge in success! Hash: ${data?.hash}`);
  }

  // ALLOWANCE INFO
  const {
    data: allowanceData,
    isError: allowanceIsError,
    isLoading: allowanceIsLoading,
    error: allowanceError,
  } = useContractRead({
    address: config.USDC,
    abi: erc20.abi,
    functionName: "allowance",
    args: [address, config.novoBridge],
    watch: true,
  });

  console.log(
    `Contract: ${config.USDC}, address: ${address}, Allowance data: ${allowanceData}, ${allowanceIsError}, ${allowanceIsLoading}, ${allowanceError})
    }`
  );

  // balance INFO
  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    error: balanceError,
  } = useContractRead({
    address: debouncedAssetAddress,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  console.log(
    `Contract: ${config.USDC}, address: ${address}, balance data: ${balanceData}, ${balanceIsError}, ${balanceIsLoading}, ${balanceError})
    }`
  );

  return (
    <Card
      style={{ backgroundColor: "white", width: "400px", borderRadius: "0px" }}
      variant="outlined"
    >
      <CardBody style={{ padding: "30px" }}>
        <Image
          src={novoLogo}
          alt="Novo Logo"
          height={100}
          style={{ margin: "auto" }}
        />
        <Stack mt="6" spacing="3">
          <Text>Asset</Text>
          <Select
            value={asset as string}
            onChange={(event) => setAsset(event.target.value)}
          >
            <option value="USDC">USDC to N-USDC</option>
            {/* <option value="usdt">USDT to N-USDT</option> */}
          </Select>
          <Text>
            Amount
            {` (Your balance: $${parseBigTokenToNumber(
              balanceData as any,
              config.tokenInfo[debouncedAssetAddress]
            )})`}
          </Text>
          <NumberInput value={amount} onChange={(value) => setAmount(value)}>
            <NumberInputField />
          </NumberInput>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <ButtonGroup spacing="2">
          <Button
            //     disabled={!write}
            variant="solid"
            colorScheme="blue"
            onClick={() => bridgeInSteps()}
          >
            Bridge In
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BridgeIn;
