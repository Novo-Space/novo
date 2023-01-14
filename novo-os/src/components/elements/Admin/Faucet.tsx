import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import Image from "next/image";
import { config } from "utils/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import novoLogo from "../../../../public/android-chrome-512x512.png";
import faucet from "../../../abis/faucet.json";

const Faucet = () => {
  const {
    config: collectConfig,
    isError: collectIsError,
    error: collectError,
  } = usePrepareContractWrite({
    address: config.faucetAddress,
    abi: faucet.abi,
    functionName: "requestTokens",
    args: [],
  });

  const { write: writeApprove } = useContractWrite({
    ...collectConfig,
  });

  const collectUSDC = () => {
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
      </CardBody>
      <CardFooter style={{ padding: "30px", margin: "auto" }}>
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            style={{ margin: "auto" }}
            onClick={() => collectUSDC()}
          >
            Collect 100 USDC
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Faucet;
