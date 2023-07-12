import React from "react";
import { HStack, VStack, Spacer, Box, Text } from "@chakra-ui/react";

export const SellCard = ({event}) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Text color="white">{event.hour}</Text>
          <Spacer />
          <Text color="white">{event.msg}</Text>
          <Spacer />
        </HStack>
      </VStack>
      <Box h="10px" />
      <Box h="2px" w="full" bg="white" />
      <Box h="10px" />
    </>
  );
};
