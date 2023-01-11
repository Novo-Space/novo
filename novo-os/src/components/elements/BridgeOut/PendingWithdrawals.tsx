import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const BridgeOut = () => {
  return (
    <Card
      style={{ backgroundColor: "white", borderRadius: "0px" }}
      variant="outlined"
    >
      <CardHeader>
        <Heading size="md">Pending Bridge Outs</Heading>
      </CardHeader>

      <TableContainer pt="4">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Amount</Th>
              <Th>Token</Th>
              <Th isNumeric>Time Till Available</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>10.23</Td>
              <Td>Dai</Td>
              <Td isNumeric>Ready For Withdrawal</Td>
            </Tr>
            <Tr>
              <Td>12.00</Td>
              <Td>Eth</Td>
              <Td isNumeric>02:23</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              style={{ fontWeight: "400" }}
            >
              Time Till Withdrawal Available
            </Heading>
            <Text pt="2" fontSize="sm">
              3 hours and 2 minutes
            </Text>
          </Box> */}
          {/* <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients.
            </Text>
          </Box> */}
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter style={{ padding: "30px" }}>
        <Stack>
          {/* <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              style={{ fontWeight: "400" }}
            >
              Amount Ready for Withdrawal
            </Heading>
            <Text style={{ fontSize: "30px", fontWeight: "bold" }}>$10.23</Text>
          </Box> */}
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Claim Completed Withdrawals
            </Button>
          </ButtonGroup>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default BridgeOut;
