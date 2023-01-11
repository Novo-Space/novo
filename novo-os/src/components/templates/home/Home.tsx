import {
  Card,
  CardBody,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      <Text marginBottom={12} style={{ fontSize: "30px" }}>
        <b>Novo</b> Dashboard
      </Text>

      <Card
        style={{
          backgroundColor: "white",
          borderRadius: "30px",
          width: "300px",
        }}
        variant="outlined"
      >
        <CardBody style={{ padding: "30px" }}>
          <Text marginBottom={2} style={{ fontSize: "20px" }}>
            Net Worth
          </Text>

          <Text style={{ fontSize: "42px", fontWeight: "bold" }}>
            $10,234.23
          </Text>
        </CardBody>
      </Card>

      <TableContainer
        style={{
          backgroundColor: "white",
          marginTop: "40px",
          borderRadius: "30px",
        }}
      >
        <Table variant="simple">
          <Thead>
            <Text style={{ padding: "16px 20px", fontWeight: "bold" }}>
              Wallet
            </Text>
            <Tr style={{ borderTop: "1px solid rgb(237, 242, 247)" }}>
              <Th>Token</Th>
              <Th isNumeric>RBalance</Th>
              <Th isNumeric>NRBalance</Th>
              <Th isNumeric>Frozen Balance</Th>
              <Th isNumeric>Total Balance</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Eth</Td>
              <Td isNumeric>23.12</Td>
              <Td isNumeric>15.20</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>38.32</Td>
              <Td isNumeric>$2300.23</Td>
              <Td isNumeric>$33979.92</Td>
            </Tr>
            <Tr>
              <Td>Dai</Td>
              <Td isNumeric>13.12</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>13.12</Td>
              <Td isNumeric>$1.00</Td>
              <Td isNumeric>$13.12</Td>
            </Tr>
            <Tr>
              <Td>USDC</Td>
              <Td isNumeric>7.23</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>0</Td>
              <Td isNumeric>7.23</Td>
              <Td isNumeric>$1.00</Td>
              <Td isNumeric>$7.23</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
