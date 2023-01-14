import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import {
  Freeze,
  FrozenReversalRequests,
  Judge,
} from "components/elements/Admin";
// import { BridgeIn } from "components/elements/BridgeIn";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <div style={{ paddingBottom: "100px" }}>
        <Text marginBottom={6} style={{ fontSize: "30px" }}>
          <b>Novo</b> Admin Panel
        </Text>

        <SimpleGrid columns={2} spacing={0}>
          <Freeze />
          <Judge />
        </SimpleGrid>
        <FrozenReversalRequests />
      </div>
    </Container>
  );
};

export default Home;
