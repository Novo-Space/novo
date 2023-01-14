import { Container, Text, VStack } from "@chakra-ui/react";
import { Faucet } from "components/elements/Admin";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <div>
          <Text marginBottom={8} style={{ fontSize: "30px" }}>
            <b>Novo</b> Faucet
          </Text>
          <Faucet />
        </div>
      </VStack>
    </Container>
  );
};

export default Home;
