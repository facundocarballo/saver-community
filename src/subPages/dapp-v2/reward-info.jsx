import React from "react";
import { VStack, HStack, Spacer, Box } from "@chakra-ui/react";
import { Timer } from "../../components/dapp-v2/timer";
import { Update } from "../../components/dapp-v2/update";
import { Reward } from "../../components/dapp-v2/reward";

export const RewardInfo = () => {
  // Attributes

  // Context

  // Methods

  // Component
  return (
    <>
      {/* Desktop */}
      <HStack
        w="full"
        display={{ lg: "flex", md: "none", sm: "none", base: "none" }}
      >
        <Spacer />
        <Timer />
        <Spacer />
        <Reward />
        <Spacer />
        <Update />
        <Spacer />
      </HStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "flex", sm: "flex", base: "flex" }}
      >
        <Timer />
        <Box h="50px" />
        <Reward />
        <Box h="70px" />
        <Update />
        <Box h="30px" />
      </VStack>
    </>
  );
};
