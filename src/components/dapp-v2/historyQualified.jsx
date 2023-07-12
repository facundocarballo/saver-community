import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  HStack,
  Box,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { ImageQualified } from "./imageQualified";
import { Loading } from "./loading";

export const HistoryQualified = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const cancelRef = React.useRef();

  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  const stopImage = "https://i.ibb.co/893fFzv/stop.png";

  // Context
  const { loadHistoryQualified, User } = useProvider();
  // Methods
  const handleHistoryQualified = async () => {
    setLoading(true);
    await loadHistoryQualified();
    setLoading(false);
    onOpen();
  };
  // Component
  return (
    <>
      {/* History Qualified */}
      {User.history == undefined ? null : (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          size="6xl"
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg='gray.800'>
              <AlertDialogHeader   fontSize="lg" fontWeight="bold">
                Historial de Calificacion
              </AlertDialogHeader>

              <AlertDialogBody w="full">
                <TableContainer w="full">
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th color='white'>Ciclo</Th>
                        <Th color='white'>Calificado</Th>
                        <Th color='white'>Sienrgy</Th>
                        <Th color='white'>Balance Ahorros</Th>
                        <Th color='white'>Minimo 3 Puntos</Th>
                        <Th color='white'>Ahorro 0.9%</Th>
                        <Th color='white'>Able Test</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {User.history.map((e, idx) => (
                        <Tr key={idx}>
                          <Td>
                            <HStack w="full">
                              <Spacer />
                              <Text color='white'>{e.cycle}</Text>
                              <Box w="5px" />
                              <Spacer />
                            </HStack>
                          </Td>
                          <Td>
                            <ImageQualified condition={e.qualified} />
                          </Td>
                          <Td>
                            <ImageQualified condition={e.qualified_sinergy} />
                          </Td>
                          <Td>
                            <ImageQualified
                              condition={
                                e.qualified_able &&
                                e.qualified_usdc &&
                                e.qualified_usdt
                              }
                            />
                          </Td>
                          <Td>
                            <ImageQualified condition={e.qualified_min_points} />
                          </Td>
                          <Td>
                            <ImageQualified
                              condition={e.qualified_increase_points}
                            />
                          </Td>
                          <Td>
                            <ImageQualified condition={e.qualified_video} />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button variant="info" ref={cancelRef} onClick={onClose}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}

      {loading ? (
        <Loading />
      ) : (
        <Button
          bg="blue.600"
          color="white"
          _hover={{
            boxShadow: "1px 1px 100px #fff",
            transform: "scale(1.1)",
          }}
          onClick={handleHistoryQualified}
        >
          Detalles
        </Button>
      )}
    </>
  );
};
