import { Container, VStack } from "@chakra-ui/react";
import Image from "next/image";
import yearn from "../../public/yearn.png";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <VStack w={"full"}>
        <Image src={yearn} alt="Yield Dashboard" />
      </VStack>
    </Container>
  );
};

export default Home;
