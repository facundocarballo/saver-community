import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useProvider } from "../../context";

export const RewardFormula = ({
  amount_to_claim,
  user_amount,
  raised_amount,
  total_amount,
  msgs,
}) => {
  // Attributes
  // Context
  const { Clock } = useProvider();
  // Methods
  // Component
  return (
    <>
      <HStack w="full">
        <Spacer />
        <VStack>
          <Text color="white">Cantidad a Recibir</Text>
          <Text color="white">{amount_to_claim}</Text>
        </VStack>
        <Text color="white">=</Text>
        <VStack>
          <Text color="white">{msgs.user_amount}</Text>
          <Text color="white">{user_amount}</Text>
        </VStack>
        <Text color="white">*</Text>
        <VStack>
          <Text color="white">
            Cantidad Recaudada (Ciclo {Clock.cycle - 1})
          </Text>
          <Text color="white">{Number(raised_amount).toFixed(2)}</Text>
        </VStack>
        <Text color="white">/</Text>
        <VStack>
          <Text color="white">{msgs.total_amount}</Text>
          <Text color="white">{total_amount}</Text>
        </VStack>
        <Spacer />
      </HStack>
    </>
  );
};
