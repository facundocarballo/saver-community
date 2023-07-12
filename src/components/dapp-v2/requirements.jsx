import React from "react";
import {
  VStack,
  HStack,
  Box,
  Image,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { HistoryQualified } from "./historyQualified";

export const Requirements = () => {
  // Attributes
  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  const stopImage = "https://i.ibb.co/893fFzv/stop.png";

  const blue = useColorModeValue("blue.300", "blue.400");

  // Context
  const { Able, USDC, USDT, Qualified, SinergyBronze, videoTest, Test, User } =
    useProvider();

  // Methods
  const isBalanced = () =>
    Number(USDC.balance) > Number(Able.points.points_of) &&
    Number(USDT.balance) > Number(Able.points.points_of) &&
    Number(Able.balance) > Number(Able.points.points_of);
  const canClaim = () =>
    isBalanced() &&
    Number(SinergyBronze.amount) > 0 &&
    Test.lastAnswer &&
    Qualified.actualSavings &&
    Number(Able.points.points_of) >= Number(User.qualified.PERCENT_DAILY_INCREASE) * Number(User.last_points) &&
    Number(Able.points.points_of) > 3;

  // Component
  return (
    <VStack>
      <Text
        fontWeight="bold"
        fontSize={{ xl: "25px", lg: "20px" }}
        color={blue}
      >
        REQUISITOS
      </Text>

      <HStack w="full">
        <Box w="5px" />
        <Image
          alt="req"
          src={Number(SinergyBronze.amount) > 0 ? checkImage : stopImage}
          boxSize="30px"
        />
        <Box w="5px" />
        <Text color="white">{"POSEER AL MENOS UN NFT SINERGY"}</Text>
        <Box w="5px" />
      </HStack>

      <HStack w="full">
        <Box w="5px" />
        <Image
          alt="req"
          src={isBalanced() ? checkImage : stopImage}
          boxSize="30px"
        />
        <Box w="5px" />
        <Text color="white">Puntos MENOR A LOS AHORROS</Text>
        <Box w="5px" />
      </HStack>

      <HStack w="full">
        <Box w="5px" />
        <Image
          alt="req"
          src={Number(Able.points.points_of) >= 3 ? checkImage : stopImage}
          boxSize="30px"
        />
        <Box w="5px" />
        <Text color="white">MINIMO DE 3 Puntos</Text>
        <Box w="5px" />
      </HStack>

      <HStack w="full">
        <Box w="5px" />
        <Image
          alt="req"
          src={
            Number(Able.points.points_of) >= Number(User.qualified.PERCENT_DAILY_INCREASE) * Number(User.last_points)
              ? checkImage
              : stopImage
          }
          boxSize="30px"
        />
        <Box w="5px" />
        <Text color="white">AUMENTAR {((Number(User.qualified.PERCENT_DAILY_INCREASE) - 1 ) * 100).toFixed(2)}% Puntos</Text>
        <Box w="5px" />
      </HStack>

      <HStack w="full">
        <Box w="5px" />
        {Test.last_answer == true || videoTest ? (
          <Image alt="req" src={checkImage} boxSize="30px" />
        ) : (
          <Image alt="req" src={stopImage} boxSize="30px" />
        )}
        <Box w="5px" />
        <Text color="white">APROBAR TEST DEL VIDEO</Text>
        <Box w="5px" />
      </HStack>

      <Box h="5px" />
      <Box w="full" h="2px" bg="white" />

      <Text fontWeight="bold" color={canClaim() ? "green.400" : "red.400"}>
        {canClaim()
          ? "Enhorabuena! La cuenta estara calificada para el proximo ciclo"
          : "Debe cumplir todos los requisitos para que su cuenta califique en el proximo ciclo"}
      </Text>
      <Box h="5px" />
      <HistoryQualified />
    </VStack>
  );
};
