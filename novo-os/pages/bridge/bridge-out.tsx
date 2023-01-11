import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { BridgeOut, PendingWithdrawals } from "components/elements/BridgeOut";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <div>
          <Text marginBottom={6} style={{ fontSize: "30px" }}>
            <b>Novo</b> Bridge Out
          </Text>
          <SimpleGrid columns={2} spacing={16}>
            <BridgeOut />
            <PendingWithdrawals />
          </SimpleGrid>
        </div>
      </VStack>
    </Container>
  );
};

export default Home;
