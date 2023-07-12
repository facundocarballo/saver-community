import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  IMG_NFT_GOLD,
  IMG_NFT_SINERGY_SILVER,
  IMG_NFT_TOKEN,
  IMG_SINERGY_TITLE,
} from "../../images";
import NextLink from "next/link";

export const ShowSaverSinergy = () => {
  // Attributes
  const imgSize = '300px';
  // Methods
  // Components
  return (
    <>
      <VStack w="full">
        <Image
          src={IMG_SINERGY_TITLE}
          alt="sinergyTitle"
          w={{ lg: "55%", md: "65%", sm: "90%", base: "90%" }}
        />

        <Box h="25px" />

        {/* Desktop */}
        <HStack
          w="full"
          display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
        >
          <Spacer />

          <NextLink href="dapp/sinergyBronze">
            <VStack cursor="pointer">
              <Image
                src={IMG_NFT_TOKEN}
                alt="Bronze-Sinergy"
                boxSize={imgSize}
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "2xl",
                  borderRadius: "25px",
                  shadow: "1px 1px 10px #fff",
                }}
              />
            </VStack>
          </NextLink>

          <Spacer />
        </HStack>

        {/* Mobile */}
        <VStack
          w="full"
          display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
        >
          <NextLink href="dapp/sinergyBronze">
            <VStack cursor="pointer">
              <Image
                src={IMG_NFT_TOKEN}
                alt="Bronze-Sinergy"
                boxSize="350px"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "2xl",
                  borderRadius: "25px",
                  shadow: "1px 1px 10px #fff",
                }}
              />
            </VStack>
          </NextLink>
        </VStack>

      </VStack>
    </>
  );
};
