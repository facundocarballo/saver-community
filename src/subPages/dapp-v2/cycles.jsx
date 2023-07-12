import React from "react";
import { Text } from "@chakra-ui/react";
import { useProvider } from "../../context";

export const Cycles = () => {
  // Attributes
  // Context
  const { Clock } = useProvider();
  // Methods
  // Component
  return (
    <>
      <Text
        color="white"
        fontSize={{ lg: "20px", md: "20px", sm: "20px", base: "20px" }}
      >
        Ciclo {Number(Clock.cycle)}
      </Text>
    </>
  );
};
