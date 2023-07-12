import React from "react";
import { HStack, Text, Box, Spacer } from "@chakra-ui/react";

export const Data = ({ title, value }) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <HStack
      minH={50}
      borderRadius={10}
      shadow='0px 1px 11px #fff'
      border="4px"
      borderColor="blue.400"
      bg='gray.800'
      _hover={{
        transform: "scale(1.1)",
      }}
    >
      <Box w="10px" />
      <Text color="white">{title}</Text>
      <Spacer />
      <Text color="white">{value}</Text>
      <Box w="10px" />
    </HStack>
  );
};
