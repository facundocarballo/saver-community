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
  Text,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { EventCard } from "./eventCard";
import { Loading } from "./loading";

export const Events = ({ wallet }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);

  // ERC20
  const [able, setAble] = React.useState(false);
  const [usdc, setUsdc] = React.useState(false);
  const [usdt, setUsdt] = React.useState(false);

  const [stablecoinReward, setStablecoinReward] = React.useState(false);
  const [ableReward, setAbleReward] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [cycleChanges, setCycleChanges] = React.useState(false);
  const [userQualification, setUserQualification] = React.useState(false);
  const [closeCycle, setCloseCycle] = React.useState(false);
  const [points, setPoints] = React.useState(false);

  const [sinergy, setSinergy] = React.useState(false);
  const [ableSale, setAbleSale] = React.useState(false);

  const [done, setDone] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const {
    Events,
    uploadAbleEvents,
    uploadUSDCEvents,
    uploadUSDTEvents,
    uploadSinergyEvents,
    uploadAbleSaleEvents,
    uploadAbleStablecoinRewardEvents,
    uploadAbleRewardEvents,
    uploadAbleVideoEvents,
    uploadAbleUpdatesEvents,
    uploadAbleCyclesChangesEvents,
    uploadAbleUserQualificationEvents,
    uploadAbleCloseCyclesEvents,
    uploadAblePointsEvents,
  } = useProvider();

  // Methods
  const handleSets = (
    _able,
    _usdc,
    _usdt,
    _stablecoinReward,
    _ableReward,
    _video,
    _update,
    _cycleChanges,
    _userQualification,
    _closeCycle,
    _points,
    _sinergy,
    _ableSale
  ) => {
    setAble(_able);
    setUsdc(_usdc);
    setUsdt(_usdt);
    setStablecoinReward(_stablecoinReward);
    setAbleReward(_ableReward);
    setVideo(_video);
    setUpdate(_update);
    setCycleChanges(_cycleChanges);
    setUserQualification(_userQualification);
    setCloseCycle(_closeCycle);
    setPoints(_points);
    setSinergy(_sinergy);
    setAbleSale(_ableSale);
  };

  // ERC20
  const handleAble = async () => {
    handleSets(
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  const handleUsdc = async () => {
    handleSets(
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadUSDCEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  const handleUsdt = async () => {
    handleSets(
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadUSDTEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  // Able

  const handleStableCoinReward = async () => {
    handleSets(
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleStablecoinRewardEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleAbleReward = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleRewardEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleVideo = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleVideoEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleUpdates = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleUpdatesEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleCyclesChanges = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleCyclesChangesEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleUserQualification = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleUserQualificationEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handleCloseCycles = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAbleCloseCyclesEvents(wallet);
    setLoading(false);
    setDone(true);
  };
  const handlePoints = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadAblePointsEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  // Sinergy
  const handleSinergy = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    );
    setDone(false);
    setLoading(true);
    await uploadSinergyEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  const handleAbleSale = async () => {
    handleSets(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    );
    setDone(false);
    setLoading(true);
    await uploadAbleSaleEvents(wallet);
    setLoading(false);
    setDone(true);
  };

  // Component
  return (
    <>
      <Modal
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay>
          <ModalContent bg="gray.800">
            <ModalHeader fontSize="lg" fontWeight="bold" color="white">
              Historial de Eventos
            </ModalHeader>

            <ModalBody w="full" bg="gray.800">
              <VStack w="full" overflowY="auto">
                {/* Desktop */}
                <VStack
                  w="full"
                  display={{
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    base: "none",
                  }}
                >
                  <HStack w="full">
                    <Box w="10px" />
                    <Spacer />
                    <Button
                      onClick={handleAble}
                      variant={able ? "info" : "outline"}
                      color={!able ? "white" : null}
                    >
                      ABLE
                    </Button>
                    <Button
                      onClick={handleStableCoinReward}
                      variant={stablecoinReward ? "info" : "outline"}
                      color={!stablecoinReward ? "white" : null}
                    >
                      Regalo Diario
                    </Button>
                    <Button
                      onClick={handleAbleReward}
                      variant={ableReward ? "info" : "outline"}
                      color={!ableReward ? "white" : null}
                    >
                      Premio ABLE
                    </Button>
                    <Button
                      onClick={handleVideo}
                      variant={video ? "info" : "outline"}
                      color={!video ? "white" : null}
                    >
                      ABLE Test
                    </Button>
                    <Button
                      onClick={handleUpdates}
                      variant={update ? "info" : "outline"}
                      color={!update ? "white" : null}
                    >
                      Actualizaciones
                    </Button>
                    <Button
                      onClick={handleCyclesChanges}
                      variant={cycleChanges ? "info" : "outline"}
                      color={!cycleChanges ? "white" : null}
                    >
                      Cambios de Ciclos
                    </Button>
                    <Button
                      onClick={handleUserQualification}
                      variant={userQualification ? "info" : "outline"}
                      color={!userQualification ? "white" : null}
                    >
                      Calificacion
                    </Button>
                    <Button
                      onClick={handleCloseCycles}
                      variant={closeCycle ? "info" : "outline"}
                      color={!closeCycle ? "white" : null}
                    >
                      Cierres de Ciclos
                    </Button>
                    <Button
                      onClick={handlePoints}
                      variant={points ? "info" : "outline"}
                      color={!points ? "white" : null}
                    >
                      Puntos ABLE
                    </Button>

                    <Spacer />
                    <Box w="10px" />
                  </HStack>

                  <HStack w="full">
                    <Box w="10px" />
                    <Spacer />
                    <Button
                      onClick={handleUsdc}
                      variant={usdc ? "info" : "outline"}
                      color={!usdc ? "white" : null}
                    >
                      USDC
                    </Button>
                    <Button
                      onClick={handleUsdt}
                      variant={usdt ? "info" : "outline"}
                      color={!usdt ? "white" : null}
                    >
                      USDT
                    </Button>
                    <Button
                      onClick={handleSinergy}
                      variant={sinergy ? "info" : "outline"}
                      color={!sinergy ? "white" : null}
                    >
                      Offer Sinergy
                    </Button>
                    <Button
                      onClick={handleAbleSale}
                      variant={ableSale ? "info" : "outline"}
                      color={!ableSale ? "white" : null}
                    >
                      Able Sale
                    </Button>

                    <Spacer />
                    <Box w="10px" />
                  </HStack>
                </VStack>

                {/* Mobile */}
                <VStack
                  w="full"
                  display={{
                    lg: "none",
                    md: "none",
                    sm: "flex",
                    base: "flex",
                  }}
                >
                  <HStack w="full">
                    <Spacer />
                    <Button
                      onClick={handleAble}
                      variant={able ? "info" : "outline"}
                      color={!able ? "white" : null}
                    >
                      ABLE
                    </Button>
                    <Button
                      onClick={handleUsdc}
                      variant={usdc ? "info" : "outline"}
                      color={!usdc ? "white" : null}
                    >
                      USDC
                    </Button>
                    <Button
                      onClick={handleUsdt}
                      variant={usdt ? "info" : "outline"}
                      color={!usdt ? "white" : null}
                    >
                      USDT
                    </Button>
                    <Spacer />
                  </HStack>
                  <HStack w="full">
                    <Spacer />
                    <Button
                      onClick={handleStableCoinReward}
                      variant={stablecoinReward ? "info" : "outline"}
                      color={!stablecoinReward ? "white" : null}
                    >
                      Regalo Diario
                    </Button>
                    <Button
                      onClick={handleAbleReward}
                      variant={ableReward ? "info" : "outline"}
                      color={!ableReward ? "white" : null}
                    >
                      Premio ABLE
                    </Button>
                    <Button
                      onClick={handleVideo}
                      variant={video ? "info" : "outline"}
                      color={!video ? "white" : null}
                    >
                      ABLE Test
                    </Button>
                    <Spacer />
                  </HStack>
                  <HStack w="full">
                    <Spacer />
                    <Button
                      onClick={handleUpdates}
                      variant={update ? "info" : "outline"}
                      color={!update ? "white" : null}
                    >
                      Actualizaciones
                    </Button>
                    <Button
                      onClick={handleCyclesChanges}
                      variant={cycleChanges ? "info" : "outline"}
                      color={!cycleChanges ? "white" : null}
                    >
                      Cambios de Ciclos
                    </Button>
                    <Button
                      onClick={handleUserQualification}
                      variant={userQualification ? "info" : "outline"}
                      color={!userQualification ? "white" : null}
                    >
                      Calificacion
                    </Button>
                    <Spacer />
                  </HStack>
                  <HStack w="full">
                    <Spacer />
                    <Button
                      onClick={handleCloseCycles}
                      variant={closeCycle ? "info" : "outline"}
                      color={!closeCycle ? "white" : null}
                    >
                      Cierres de Ciclos
                    </Button>
                    <Button
                      onClick={handlePoints}
                      variant={points ? "info" : "outline"}
                      color={!points ? "white" : null}
                    >
                      Puntos ABLE
                    </Button>
                    <Spacer />
                  </HStack>
                  <HStack w="full">
                    <Spacer />
                    <Button
                      onClick={handleSinergy}
                      variant={sinergy ? "info" : "outline"}
                      color={!sinergy ? "white" : null}
                    >
                      Offer Sinergy
                    </Button>
                    <Button
                      onClick={handleAbleSale}
                      variant={ableSale ? "info" : "outline"}
                      color={!ableSale ? "white" : null}
                    >
                      Able Sale
                    </Button>
                    <Spacer />
                  </HStack>
                </VStack>

                {done ? (
                  Events.length == 0 ? (
                    <Text color="white" fontSize="17px">
                      Ultimamente no se registraron eventos correspondientes.
                    </Text>
                  ) : (
                    Events.allEventsSorted.map((event, idx) => {
                      if (
                        idx == 0 ||
                        Events.allEventsSorted[idx - 1].date != event.date
                      ) {
                        return (
                          <VStack id={idx} w="full">
                            {idx != 0 ? <Box h="30px" /> : null}
                            <HStack w="full">
                              <Heading color="white">{event.date}</Heading>
                              <Spacer />
                            </HStack>
                            <Box h="10px" />
                            <EventCard event={event} />
                          </VStack>
                        );
                      } else {
                        return (
                          <VStack id={idx} w="full">
                            <EventCard event={event} />
                          </VStack>
                        );
                      }
                    })
                  )
                ) : null}

                {loading ? <Loading /> : null}
              </VStack>
            </ModalBody>

            <ModalFooter bg="gray.800">
              <Button variant="info" ref={cancelRef} onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

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
          onClick={onOpen}
        >
          Historial
        </Button>
      )}
    </>
  );
};