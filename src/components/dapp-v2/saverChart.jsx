import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  VStack,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  HStack,
  Spacer,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useProvider } from "../../context";

export const SaverChart = () => {
  // Context
  const { Able, USDT, USDC, User } = useProvider();

  // Attributes
  const [showTable, setShowTable] = React.useState(false);
  const onClose = () => setShowTable(false);
  const cancelRef = React.useRef();
  const blue = useColorModeValue("blue.300", "blue.400");
  const red = "red.300";

  const getTotalsAmount = () => {
    let totalAmounts = [];

    Able.saving.data.map((e) => {
      totalAmounts.push(Number(e.donationBalance));
    });

    console.log("=> ", totalAmounts);
    return totalAmounts;
  };

  const getMaxSaving = () => {
    if (User.saving.data.length > 0) {
      let max = 0;
      User.saving.data.map((e) => {
        if (Number(e.donationBalance) > max) {
          max = Number(e.donationBalance);
        }
      });
      return max;
    }
    return 0;
  };

  const getMinSaving = () => {
    if (User.saving.data.length > 0) {
      let min = User.saving.data[0].donationBalance;
      User.saving.data.map((e) => {
        if (Number(e.donationBalance) < min) {
          min = Number(e.donationBalance);
        }
      });
      return min;
    }
    return 0;
  };

  const data = {
    labels: User.saving.data.map((e) => e.day + 1),
    datasets: [
      {
        label: "Puntos",
        data: User.saving.data.map((e) => e.donationBalance),
        backgroundColor: User.saving.data.map((e) => {
          if (e.donationBalance >= e.limit) return "green";
          return "red";
        }),
        type: "bar",
        borderRadius: 6,
      },
      {
        label: "Metas 0.9%",
        data: User.saving.data.map((e) => e.limit),
        color: "white",
        borderColor: "white",
        backgroundColor: "white",
        type: "line",
      },
    ],
  };

  const options = {
    tooltips: {
      enabled: false,
    },
    puligns: {
      lengend: {
        display: false,
      },
    },
    scales: {
      yAxes: {
        display: false,
        max: getMaxSaving() * 1.02,
        min: getMinSaving() * 0.99,
      },
    },
  };

  // Methods
  const formatAmount = (amount) => {
    // > 1 Billion
    if (amount / 1000000000 >= 1)
      return `${Number(amount / 1000000000).toFixed(2)}B`;
    // > 1Million
    if (amount / 1000000 >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
    // > 100K
    if (amount / 100000 >= 1) return `${Number(amount / 1000).toFixed(2)}K`;

    // < 100K
    return `${Number(amount).toFixed(2)}`;
  };

  // Component
  return (
    <>
      {/* Alert Dialog (Table) */}
      <AlertDialog
        isOpen={showTable}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        size="6xl"
      >
        <AlertDialogOverlay />
        <AlertDialogHeader>{"Evolucion de tus ahorros"}</AlertDialogHeader>
        <AlertDialogContent bg='gray.800'>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Box h="10px" />
            <HStack w="full">
              <Spacer />
              <Heading color='white'>{"EVOLUCION DE TUS AHORROS"}</Heading>
              <Spacer />
            </HStack>
            <Box h="10px" />
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th color='white'>Ciclos</Th>
                    <Th color='white'>Objetivo</Th>
                    <Th color='white'>TRIPLE INT.</Th>
                    <Th color='white'>Cumplido</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {User.saving.data.map((data, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td color='white'>{data.day + 1}</Td>
                        <Td color='white'>{Number(data.limit).toFixed(4)}</Td>
                        <Td color='white'>{Number(data.donationBalance).toFixed(4)}</Td>
                        <Td color='white'>
                          {Number(data.donationBalance) >= Number(data.limit)
                            ? "SI"
                            : "NO"}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="info">
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <VStack w={{ lg: "25%", md: "100%", sm: "100%", base: "100%" }}>
        <Bar data={data} options={options} />
        <Button
          onClick={() => setShowTable(true)}
          bg="blue.600"
          color="white"
          _hover={{
            boxShadow: "1px 1px 100px #fff",
            transform: "scale(1.1)",
          }}
        >
          DETALLES
        </Button>
        <Box h="15px" />

        <Text fontSize="30px" fontWeight="bold" color={blue}>
          {`$ ${formatAmount(Number(USDC.balance) + Number(USDT.balance))} Ahorrados`}
        </Text>
      </VStack>
    </>
  );
};
