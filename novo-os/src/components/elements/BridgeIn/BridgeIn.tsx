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
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { ContractName } from "types";
import { useDebounce } from "use-debounce";
import { contractAddresses } from "utils/contractAddresses";
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
  const { address } = useAccount();

  const [asset, setAsset] = useState("weth");
  const assetAddress = contractAddresses[asset as ContractName];
  const [debouncedAssetAddress] = useDebounce(assetAddress, 500);

  const [amount, setAmount] = useState("0");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config: approveConfig } = usePrepareContractWrite({
    address: debouncedAssetAddress,
    abi: erc20.abi,
    functionName: "approve",
    args: [contractAddresses.novoBridge, parseInt(debouncedAmount)],
  });

  const { write: writeApprove } = useContractWrite(approveConfig);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddresses.novoBridge,
    abi: bridge.abi,
    functionName: "BridgeIn",
    args: [debouncedAssetAddress, debouncedAmount],
    // Revisit what this is for later.
    //     enabled:
  });

  const { data, error, isError, write } = useContractWrite(config);

  if (isPrepareError || isError) {
    console.log((prepareError || error)?.message);
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log(`Is success: ${isSuccess}`);

  if (isSuccess) {
    console.log(`Transaction success! Hash: ${data?.hash}`);
  }

  const bridgeInSteps = () => {
    // Approve token for bridging
    console.log("WRITE APPROVE");
    writeApprove?.();
    // Bridge the token
    console.log(`WRITE: ${write}`);
    write?.();
  };

  // ALLOWANCE INFO
  const {
    data: allowanceData,
    isError: allowanceIsError,
    isLoading: allowanceIsLoading,
    error: allowanceError,
  } = useContractRead({
    address: contractAddresses.usdc,
    abi: erc20.abi,
    functionName: "allowance",
    args: [address, contractAddresses.novoBridge],
    watch: true,
  });

  console.log(
    `Contract: ${contractAddresses.usdc}, address: ${address}, Allowance data: ${allowanceData}, ${allowanceIsError}, ${allowanceIsLoading}, ${allowanceError})
    }`
  );

  // balance INFO
  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    error: balanceError,
  } = useContractRead({
    address: contractAddresses.usdc,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  console.log(
    `Contract: ${contractAddresses.usdc}, address: ${address}, balance data: ${balanceData}, ${balanceIsError}, ${balanceIsLoading}, ${balanceError})
    }`
  );

  // REV Address
  const {
    data: revData,
    isError: revIsError,
    isLoading: revIsLoading,
    error: revError,
  } = useContractRead({
    address: contractAddresses.novoBridge,
    abi: bridge.abi,
    functionName: "getRev",
    args: [contractAddresses.usdc],
    watch: true,
  });

  console.log(
    `Contract: ${contractAddresses.usdc}, address: ${address}, rev data: ${revData}, ${revIsError}, ${revIsLoading}, ${revError})
    }`
  );

  // nusdc Address
  const {
    data: nusdcData,
    isError: nusdcIsError,
    isLoading: nusdcIsLoading,
    error: nusdcError,
  } = useContractRead({
    address: contractAddresses.nusdc,
    abi: erc20.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  console.log(
    `Contract: ${contractAddresses.usdc}, address: ${address}, nusdc data: ${nusdcData}, ${nusdcIsError}, ${nusdcIsLoading}, ${nusdcError})
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
            <option value="weth">Weth to N-Eth</option>
            <option value="usdc">USDC to N-USDC</option>
            <option value="dai">DAI to N-DAI</option>
          </Select>
          <Text>Amount</Text>
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
