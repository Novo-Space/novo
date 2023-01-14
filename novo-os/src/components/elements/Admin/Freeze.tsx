import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConfigKey } from "types";
import { useDebounce } from "use-debounce";
import { config } from "utils/config";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import werc20 from "../../../abis/wERC20.json";

const Freeze = () => {
  const toast = useToast();
  const { address } = useAccount();

  const [asset, setAsset] = useState("N-USDC");
  const assetAddress = config[asset as ConfigKey];
  const [debouncedAssetAddress] = useDebounce(assetAddress, 500);
  const [epoch, setEpoch] = useState("");
  const [from, setFrom] = useState("");
  const [spenditureIndex, setSpenditureIndex] = useState("");

  const { config: freezeConfig } = usePrepareContractWrite({
    address: debouncedAssetAddress,
    abi: werc20.abi,
    functionName: "freeze",
    args: [epoch, from, spenditureIndex],
  });

  const { write: freezeWrite } = useContractWrite({
    ...freezeConfig,
  });

  const freezeSteps = () => {
    // // Approve token for bridging
    console.log("FREEZE");
    freezeWrite?.();
  };

  return (
    <Card
      style={{ backgroundColor: "white", width: "400px", borderRadius: "0px" }}
      variant="outlined"
    >
      <CardBody style={{ padding: "30px" }}>
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
            <option value="N-USDC">N-USDC</option>
            <option value="N-DAI">N-DAI</option>
          </Select>
          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            Epoch
          </Heading>
          <NumberInput value={epoch} onChange={(value) => setEpoch(value)}>
            <NumberInputField />
          </NumberInput>

          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            From
          </Heading>
          <Input
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />

          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            Spenditure Index
          </Heading>
          <NumberInput
            value={spenditureIndex}
            onChange={(value) => setSpenditureIndex(value)}
          >
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
            onClick={() => freezeSteps()}
          >
            Freeze
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Freeze;
