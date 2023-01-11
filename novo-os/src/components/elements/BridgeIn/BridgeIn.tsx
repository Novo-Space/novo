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
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import novoLogo from "../../../../public/android-chrome-512x512.png";
import bridge from "../../../abis/bridge.json";

const BridgeIn = () => {
  const [asset, setAsset] = useState("weth");
  const assetAddress = contractAddresses[asset as ContractName];
  const [debouncedAsset] = useDebounce(assetAddress, 500);

  const [amount, setAmount] = useState("0");
  const [debouncedAmount] = useDebounce(amount, 500);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddresses.novoBridge,
    abi: bridge.abi,
    functionName: "BridgeIn",
    args: [debouncedAsset, debouncedAmount],
    // Revisit what this is for later.
    //     enabled:
  });

  const { data, error, isError, write } = useContractWrite(config);

  if (isPrepareError || isError) {
    console.log((prepareError || error)?.message);
  }

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
            disabled={!write}
            variant="solid"
            colorScheme="blue"
            onClick={() => write?.()}
          >
            Bridge In
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BridgeIn;
