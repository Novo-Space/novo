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
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import novoLogo from "../../../../public/android-chrome-512x512.png";

const BridgeOut = () => {
  const [asset, setAsset] = useState("eth");
  const [amount, setAmount] = useState(0);
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
            <option value="eth">N-Eth to Eth</option>
            <option value="usdc">N-USDC to USDC</option>
            <option value="dai">N-DAI to DAI</option>
          </Select>
          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            Amount
          </Heading>
          <NumberInput
            value={amount}
            onChange={(value) => setAmount(parseInt(value))}
          >
            <NumberInputField />
          </NumberInput>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Initiate Bridge Out
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BridgeOut;
