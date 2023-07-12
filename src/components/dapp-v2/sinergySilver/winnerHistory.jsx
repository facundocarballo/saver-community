import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useProvider } from "../../../context";
import { EventCard } from "../eventCard";
import { Loading } from "../loading";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export const WinnerHistory = ({ id, wallet, msg }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const { Winners, uploadWinners } = useProvider();

  // Methods
  const handleOpen = async () => {
    setLoading(true);
    await uploadWinners();
    setLoading(false);
    onOpen();
  };

  // Component
  return (
    <>
      {Winners != null ? (
        <Modal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          scrollBehavior="inside"
          size="6xl"
        >
          <ModalOverlay>
            <ModalContent>
              <ModalHeader fontSize="lg" fontWeight="bold" bg="gray.900">
                Historial de Ganadores
              </ModalHeader>

              <ModalBody w="full" bg="gray.900">
                <VStack overflowY="auto">
                  {Winners.map((winner, idx) => {
                    if (
                      idx == 0 ||
                      Winners[idx - 1].date != winner.date
                    ) {
                      return (
                        <VStack id={idx} w="full">
                          {idx != 0 ? <Box h="30px" /> : null}
                          <HStack w="full">
                            <Heading color="white">{winner.date}</Heading>
                            <Spacer />
                          </HStack>
                          <Box h="10px" />
                          <EventCard event={winner} />
                        </VStack>
                      );
                    } else {
                      return (
                        <VStack id={idx} w="full">
                          <EventCard event={winner} />
                        </VStack>
                      );
                    }
                  })}
                </VStack>
              </ModalBody>

              <ModalFooter bg="gray.900">
                <Button variant="info" ref={cancelRef} onClick={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      ) : null}

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
          onClick={handleOpen}
        >
          {msg == null ? <InfoOutlineIcon /> : msg}
        </Button>
      )}
    </>
  );
};
