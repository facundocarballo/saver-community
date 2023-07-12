import React from "react";
import { HStack, VStack, Spacer, Box, Text } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Text color='white'>{event.hour}</Text>
          <Box w='4px'/>
          <Text color='white'>{event.msg}</Text>
          <Spacer />
          <Text color='white'>{event.value}</Text>
          <Box w="10px" />
        </HStack>
      </VStack>
      <Box h='10px' />
      <Box h='2px' w='full' bg='white' />
      <Box h='10px' />
    </>
  );
};
