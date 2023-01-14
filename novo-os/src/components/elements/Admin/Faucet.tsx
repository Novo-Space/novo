import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Image from "next/image";
import { useState } from "react";
import { config } from "utils/config";
import { erc20ABI, useProvider } from "wagmi";
import novoLogo from "../../../../public/android-chrome-512x512.png";

const Faucet = () => {
  const provider = useProvider();
  const [to, setTo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [waiting, setWaiting] = useState(false);

  //   const {
  //     config: collectConfig,
  //     isError: collectIsError,
  //     error: collectError,
  //   } = usePrepareContractWrite({
  //     address: config.faucetAddress,
  //     abi: faucet.abi,
  //     functionName: "requestTokens",
  //     args: [],
  //   });

  //   const { write: writeApprove } = useContractWrite({
  //     ...collectConfig,
  //   });

  //   const collectUSDC = () => {
  //     writeApprove?.();
  //   };

  const sendTokens = async () => {
    onOpen();
    setWaiting(true);
    // Send ETH and USDC
    const wallet = new ethers.Wallet(config.sudoPK);
    const walletSigner = wallet.connect(provider);
    const contract = new ethers.Contract(config.USDC, erc20ABI, walletSigner);

    // Transfer USDC
    const tx = await contract.transfer(to, 100_000_000);
    console.log("TRANSACTION SEND", tx);
    const receipt = await tx.wait();
    console.log("TRANSACTION RECEIPT", receipt);

    const tx2 = await walletSigner.sendTransaction({
      to: to,
      value: ethers.utils.parseEther("1.0"),
    });
    console.log("ETH SEND");
    const receipt2 = await tx2.wait();
    console.log("ETH SEND RECEIPT");
    onClose();
    setTimeout(() => {
      setWaiting(false);
    }, 10000);
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          width: "400px",
          borderRadius: "0px",
        }}
        variant="outlined"
      >
        <CardBody style={{ padding: "30px" }}>
          <Image
            src={novoLogo}
            alt="Novo Logo"
            height={100}
            style={{ margin: "auto", marginBottom: "50px" }}
          />

          <Heading
            size="xs"
            textTransform="uppercase"
            style={{ fontWeight: "400" }}
          >
            To
          </Heading>
          <Input value={to} onChange={(event) => setTo(event.target.value)} />
        </CardBody>
        <CardFooter style={{ padding: "30px", margin: "auto" }}>
          <VStack>
            <ButtonGroup>
              <Button
                variant="solid"
                colorScheme="blue"
                style={{ margin: "auto" }}
                onClick={() => sendTokens()}
                isDisabled={waiting}
              >
                Collect 1 ETH and 100 USDC
              </Button>
            </ButtonGroup>
            {waiting && (
              <Text size="xs">Must wait to use the faucet again</Text>
            )}
          </VStack>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Waiting For Transaction Receipts</ModalHeader>

          <VStack style={{ marginBottom: "50px" }}>
            <Image
              src={novoLogo}
              alt="Novo Logo"
              height={100}
              style={{ margin: "auto", marginBottom: "20px" }}
            />
            <Spinner size="xl" />
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Faucet;
