import React from "react";
import { VStack, Text } from "@chakra-ui/react";

export const NFTSaleList = ({ nft, symbol }) => {
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
          Posicion: {nft.pos}
        </Text>
        <Text fontWeight="black" color="white">
          ID: {nft.id}
        </Text>
        <Text fontWeight="black" color="white">
          {nft.sale} {symbol}{nft.sale > 1 ? 's' : ''}
        </Text>
      </VStack>
    </>
  );
};