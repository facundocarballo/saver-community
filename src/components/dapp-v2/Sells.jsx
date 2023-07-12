import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  useDisclosure,
  Button,
  HStack,
  Heading,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { Loading } from "./loading";
import { getOnlySellTokenEvent } from "../../web3/funcs/events/sinergy/sale";
import { useProvider } from "../../context";
import { SellCard } from "./SellCard";

export const Sells = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [sells, setSells] = React.useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const { AbleSale, addressAccount } = useProvider();

  // Methods
  const handleLoadSells = async () => {
    setLoading(true);
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - 10000;
    const data = await getOnlySellTokenEvent(
      AbleSale.contract,
      addressAccount,
      fromBlock,
      currentBlock,
      "ether",
      "ABLE"
    );
    setSells(data);
    setLoading(false);
    onOpen();
  };

  // Component
  return (
    <>
      {sells != null ? (
        <Modal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          scrollBehavior="inside"
          size="6xl"
        >
          <ModalOverlay>
            <ModalContent bg="gray.900">
              <ModalHeader color='white' fontSize="lg" fontWeight="bold">
                Ultimas Ventas
              </ModalHeader>

              <ModalBody w="full" bg="gray.900">
                <VStack overflowY="auto">
                  {sells.map((event, idx) => {
                    if (idx == 0 || sells[idx - 1].date != event.date) {
                      return (
                        <VStack id={idx} w="full">
                          {idx != 0 ? <Box h="30px" /> : null}
                          <HStack w="full">
                            <Heading fontSize="xl" color="white">
                              {event.date}
                            </Heading>
                            <Spacer />
                          </HStack>
                          <Box h="10px" />
                          <SellCard event={event} />
                        </VStack>
                      );
                    } else {
                      return (
                        <VStack id={idx} w="full">
                          <SellCard event={event} />
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
          w="100px"
          _hover={{
            boxShadow: "1px 1px 100px #fff",
            transform: "scale(1.1)",
          }}
          onClick={handleLoadSells}
        >
          Ventas
        </Button>
      )}
    </>
  );
};
