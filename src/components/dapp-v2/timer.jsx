import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useProvider } from "../../context";
import { Cycles } from "../../subPages/dapp-v2/cycles";

export const Timer = () => {
  const { Clock } = useProvider();

  return (
    <VStack>
        
      <Text
        color="white"
        fontSize="45px"
        fontWeight="extrabold"
        align="center"
        fontFamily="monospace"
        w="190px"
        border="4px"
        borderColor="white"
        borderRadius={6}
      >
        {Clock.timer}
      </Text>
      <Cycles />
    </VStack>
  );
};
