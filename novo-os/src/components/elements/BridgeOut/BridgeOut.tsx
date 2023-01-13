import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
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
} from "wagmi";
import novoLogo from "../../../../public/android-chrome-512x512.png";
import bridge from "../../../abis/bridge.json";
import erc20 from "../../../abis/erc20.json";

const BridgeOut = () => {
  const toast = useToast();
  const { address } = useAccount();

  const [asset, setAsset] = useState("N-USDC");
  const assetAddress = config[asset as ConfigKey];
  const [debouncedAssetAddress] = useDebounce(assetAddress, 500);

  const [amount, setAmount] = useState("0");
  const [debouncedAmount] = useDebounce(amount, 500);
  const decimalAdjustedDebouncedAmount = adjustAmountByDecimal(
    parseInt(debouncedAmount),
    config.tokenInfo[debouncedAssetAddress].decimals
  );

  const { config: approveConfig } = usePrepareContractWrite({
    address: debouncedAssetAddress,
    abi: erc20.abi,
    functionName: "approve",
    args: [config.novoBridge, decimalAdjustedDebouncedAmount],
  });

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
    functionName: "BridgeOut",
    args: [
      config[asset.substring(2) as ConfigKey],
      decimalAdjustedDebouncedAmount,
    ],
    onSuccess(data, variables, context) {
      toast({
        title: "Bridge out initiation successful!",
        description:
          "You successfully initiated bridging funds out of Novo Space",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

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

  const bridgeOutSteps = () => {
    // Approve token for bridging
    console.log("WRITE APPROVE");
    writeApprove?.();
  };

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
          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            Asset
          </Heading>
          <Select
            value={asset}
            onChange={(event) => setAsset(event.target.value)}
          >
            {/* <option value="eth">N-Eth to Eth</option> */}
            <option value="N-USDC">N-USDC to USDC</option>
            <option value="N-DAI">N-DAI to DAI</option>
          </Select>
          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            Amount
            {` (Your balance: $${parseBigTokenToNumber(
              balanceData as any,
              config.tokenInfo[debouncedAssetAddress]
            )})`}
          </Heading>
          <NumberInput value={amount} onChange={(value) => setAmount(value)}>
            <NumberInputField />
          </NumberInput>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => bridgeOutSteps()}
          >
            Initiate Bridge Out
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BridgeOut;
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
