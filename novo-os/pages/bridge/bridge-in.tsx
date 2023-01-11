import { Container, Text, VStack } from "@chakra-ui/react";
import { BridgeIn } from "components/elements/BridgeIn";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <div>
          <Text marginBottom={6} style={{ fontSize: "30px" }}>
            <b>Novo</b> Bridge In
          </Text>
          <BridgeIn />
        </div>
      </VStack>
    </Container>
  );
};

export default Home;
