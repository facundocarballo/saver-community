import React from "react";
import {
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

export const GeneralInfoNFTCard = ({ title, value }) => {
  // Attributes

  // Context

  // Methods

  // Component
  return (
    <HStack w={{xl:"700px", lg: "500px", md: '90%', sm: '90%', base:'90%'}} bg="white" borderRadius={6}>
      <Spacer />
      <Text color="black" fontSize={{lg: "28px", md: '20px', sm:'18px', base:'18px'}} fontWeight="bold">
        {title}
      </Text>
      <Spacer />
      <HStack h={{xl: "50px", lg: '75px', md:'50px', sm: '50px', base:'50px'}} w={{lg: "300px", md: '200px', sm: '200px', base: '200px'}} bg="yellow.400" borderRadius={6}>
        <Spacer />
        <Text color="white" fontSize="20px" fontWeight="bold">
          {value}
        </Text>
        <Spacer />
      </HStack>
    </HStack>
  );
};
