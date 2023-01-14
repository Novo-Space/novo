import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Input,
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
  const [claimID, setClaimID] = useState("");

  const {
    config: reverseConfig,
    isError,
    error,
  } = usePrepareContractWrite({
    address: debouncedAssetAddress,
    abi: werc20.abi,
    functionName: "reverse",
    args: [claimID],
  });

  if (isError) {
    console.log("ERROR", error);
  }

  const { write: reverseWrite } = useContractWrite({
    ...reverseConfig,
  });

  const reverseSteps = () => {
    // // Approve token for bridging
    console.log("REVERSE");
    reverseWrite?.();
  };

  // const { config: rejectReverseConfig } = usePrepareContractWrite({
  //   address: debouncedAssetAddress,
  //   abi: werc20.abi,
  //   functionName: "rejectReverse",
  //   args: [claimID],
  // });

  // const { write: rejectReverseWrite } = useContractWrite({
  //   ...rejectReverseConfig,
  // });

  // const rejectReverseSteps = () => {
  //   // // Approve token for bridging
  //   console.log("REJECT REVERSE");
  //   rejectReverseWrite?.();
  // };

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
            Claim ID
          </Heading>
          <Input
            value={claimID}
            onChange={(event) => setClaimID(event.target.value)}
          />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => reverseSteps()}
          >
            Reverse
          </Button>

          <Button
            variant="solid"
            colorScheme="blue"
            // onClick={() => rejectReverseSteps()}
          >
            Reject Reverse
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Freeze;
