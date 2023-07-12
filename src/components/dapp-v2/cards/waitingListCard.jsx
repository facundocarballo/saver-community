import React from "react";
import { VStack, HStack, Box, Spacer, Text, Image } from "@chakra-ui/react";
import { getHourFromTimestampWEB } from "../../../web3/funcs/events/common";
import { Events } from "../sinergySilver/events";

export const NFTWaitingListCard = ({ nft }) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack
        p="10px"
        border="2px"
        borderRadius={10}
        shadow="1px 1px 10px #fff"
        _hover={{
          shadow: "1px 11px 30px #fff",
        }}
      >
        <Text fontWeight="black" color="white">
          ID: {nft.id}
        </Text>
        <Text fontWeight="black" color="white">
          Posicion: {nft.pos}
        </Text>
      </VStack>
    </>
  );
};
