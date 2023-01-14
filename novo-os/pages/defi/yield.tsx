import { Container, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import yearn from "../../public/yearn.png";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <div>
          <Text marginBottom={6} style={{ fontSize: "30px" }}>
            <b>Novo</b> Yield (Coming Soon)
          </Text>
          <Image src={yearn} alt="Yield Dashboard" />
        </div>
      </VStack>
    </Container>
  );
};

export default Home;
