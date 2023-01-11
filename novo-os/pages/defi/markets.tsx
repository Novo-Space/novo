import { VStack } from "@chakra-ui/react";
import Image from "next/image";
import yearn from "../../public/markets.png";

const Home = () => {
  return (
    <VStack w={"full"}>
      <Image src={yearn} alt="Markets Dashboard" />
    </VStack>
  );
};

export default Home;
