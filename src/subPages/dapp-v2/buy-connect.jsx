import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { BuyCDA } from "../../components/dapp-v2/buyCDA";
import { ConnectWallet } from '../../components/dapp-v2/connectWallet';

export const BuyAndConnect = () => {
  // Attributes

  // Context
  const { Qualified, addressAccount } = useProvider();

  // Methods

  // Component
  return (
    <VStack w="full" bg="black">
      { addressAccount == null || Qualified == null || Qualified.video == undefined ? (
        // <ChooseNFT />
        <>
          <ConnectWallet />
        </>
      ) : (
        <>
          {/* Desktop */}
          <HStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <Spacer />

            <BuyCDA />

            <Spacer />
          </HStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="20px" />

            <BuyCDA />

            <Box h="20px" />

          </VStack>
        </>
      )}
    </VStack>
  );
};
