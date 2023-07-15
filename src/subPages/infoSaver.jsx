import { VStack, HStack, Text, Box, Spacer, Spinner } from "@chakra-ui/react";
import { InfoCard } from "../components/infoCard";
import { useProvider } from "../context";
import React from "react";

export const InfoSaver = () => {
  const { saverCirculation, saverHolders } = useProvider();

  const circulation = {
    title: "ABLE en Circulación",
    amount: saverCirculation,
  };

  const holders = {
    title: "Cantidad de Holders",
    amount: saverHolders,
  };

  return (
    <>
      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
      >
        <HStack w="full">
          <Spacer />
          <InfoCard props={circulation} />
          <Spacer />
        </HStack>
        <HStack w="full">
          <Spacer />
          <Text align="justify" w="full" color="white">
            {
              "El token SAVER servirá como regulador de acceso hacia la comunidad, regulando las cantidades necesarias para participar en el juego ahorrativo de Saver Community. Inicialmente se mintearon 11.070.000 de SAVER que corresponden al 3% del total supply esperado. Los tokens restantes se mintearan a medida que se vayan reclamando los Premio SAVER."
            }
          </Text>
          <Spacer />
        </HStack>

        <Box h="30px" />

        <HStack w="full">
          <Spacer />
          <InfoCard props={holders} />
          <Spacer />
        </HStack>
        <HStack w="full">
          <Spacer />
          <Text align="justify" w="full" color="white">
            {
              "Los holders de SAVER no tienen que participar necesariamente en Saver Community y pueden realizar transacciones libremente con los tokens. Por el propio diseño del sistema en torno al SAVER, se espera que mantenga un incremento y sostenimiento de su precio alrededor de 1 USDC, aunque puede que oscile entre 1 y 10 USDC debido a los diferentes intereses y usos de sus usuarios. El potencial que vemos sobre todo para el token es que pueda estar bien distribuido en una comunidad que lo aprecie, favoreciendo así su uso y no tanto su especulación."
            }
          </Text>
          <Spacer />
        </HStack>

        <Box h="30px" />
      </VStack>

      {/* Desktop */}
      <VStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
      >
        <HStack w="full">
          <Box w="10px" />
          <Text align="justify" w="full" color="white">
            {
              "El token SAVER servirá como regulador de acceso hacia la comunidad, regulando las cantidades necesarias para participar en el juego ahorrativo de Saver Community. Inicialmente se mintearon 11.070.000 de SAVER que corresponden al 3% del total supply esperado. Los tokens restantes se mintearan a medida que se vayan reclamando los Premio SAVER."
            }
          </Text>
          <Spacer />
          <InfoCard props={circulation} />
          <Box w="10px" />
        </HStack>

        <Box h="30px" />

        <HStack>
          <Box h="10px" />
          <InfoCard props={holders} />
          <Spacer />
          <Text align="justify" w="full" color="white">
            {
              "Los holders de SAVER no tienen que participar necesariamente en Saver Community y pueden realizar transacciones libremente con los tokens. Por el propio diseño del sistema en torno al SAVER, se espera que mantenga un incremento y sostenimiento de su precio alrededor de 1 USDC, aunque puede que oscile entre 1 y 10 USDC debido a los diferentes intereses y usos de sus usuarios. El potencial que vemos sobre todo para el token es que pueda estar bien distribuido en una comunidad que lo aprecie, favoreciendo así su uso y no tanto su especulación."
            }
          </Text>
          <Box h="10px" />
        </HStack>

        <Box h="30px" />
      </VStack>
    </>
  );
};
