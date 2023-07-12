import React from "react";
import {
  VStack,
  HStack,
  Box,
  Spacer,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useProvider } from "../../context";

export const DaysPlaying = () => {
  // Attributes
  const textColor = useColorModeValue("white", "bgDark");
  const trackBG = "white";
  const filledBG = useColorModeValue("blue.300", "blue.200");
  const timePhoto = useColorModeValue(
    "https://i.ibb.co/rf0c0Ht/time.png",
    "https://i.ibb.co/zQSJzhn/time-dark.png"
  );

  // Context
  const { Able, User, Clock } = useProvider();

  // Methods
  const getDaysPlaying = () => {
    if (!User.is_qualified) return 0;
    // 21 - (23 - 2) = 0
    // 21 - (23 - 20) = 18
    // 21 - (23 - 24) = 22
    return (
      Able.reward.CYCLES_FOR_ABLE_REWARD -
      (Able.reward.cycle_to_able_reward - Clock.cycle)
    );
  };

  const getDaysPlayingValue = () => {
    return (getDaysPlaying() * 100) / Able.reward.CYCLES_FOR_ABLE_REWARD;
  };

  // Component
  return (
    <VStack>
      <HStack w="full">
        <Spacer />

        <Slider value={getDaysPlayingValue()} h="100px">
          <SliderTrack bg={trackBG} h="50px" borderRadius={8}>
            <SliderFilledTrack bg={filledBG} />
            <VStack w="full" h="full" position="absolute">
              <Spacer />
              <HStack w="full">
                <Box w="40%" />
                <Text color="black" fontWeight="bold">
                  {getDaysPlaying()} Ciclo{getDaysPlaying() != 1 ? "s" : null}{" "}
                  Jugando
                </Text>
              </HStack>
              <Spacer />
            </VStack>
          </SliderTrack>
        </Slider>

        <Spacer />
      </HStack>

      <HStack w="full">
        <Box w="5px" />
        {/* Mostrar cosas que nos faltan para alcanzar el premio saver en forma de lista */}

        <Text color="white">
          {getDaysPlaying() <= Able.reward.CYCLES_FOR_ABLE_REWARD
            ? "Actualmente no estas calificado para recibir el PREMIO ABLE"
            : "YA PUEDES RECIBIR EL PREMIO ABLE"}
        </Text>
        <Spacer />
      </HStack>

      {User.is_qualified ? (
        getDaysPlaying() <= Able.reward.CYCLES_FOR_ABLE_REWARD ? (
          <VStack>
            <HStack w="full">
              <Box w="5px" />
              <Image src={timePhoto} alt="bdd" boxSize="30px" />
              {Clock.cycle == Able.reward.cycle_to_able_reward ? (
                <Text color="white" fontWeight="bold">
                  Si finalizas este ciclo calificado podras recibir el Premio
                  Able
                </Text>
              ) : (
                <Text color="white" fontWeight="bold">
                  Debes permanecer{" "}
                  {Able.reward.cycle_to_able_reward - Clock.cycle} CICLO
                  {Number(Able.reward.cycle_to_able_reward - Clock.cycle) > 0
                    ? "S"
                    : null}{" "}
                  calificado para poder reclamar el Premio ABLE
                </Text>
              )}

              <Spacer />
            </HStack>
            <Text color="white" fontWeight="bold">
              Podras recibir tu premio en el ciclo:{" "}
              {Number(Able.reward.cycle_to_able_reward) + 1}
            </Text>
          </VStack>
        ) : null
      ) : (
        <HStack w="full">
          <Box w="5px" />
          <Text color="white" fontWeight="bold">
            Debes calificarte para empezar a participar del Premio ABLE
          </Text>
          <Spacer />
        </HStack>
      )}

      <Spacer />
    </VStack>
  );
};
