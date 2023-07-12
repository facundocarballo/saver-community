import React from "react";
import {
  VStack,
  HStack,
  Box,
  Spacer,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import { NFT_IMG } from "../../web3/funcs";
import CurvedText from "../curvedText";

export const NFT_IMAGE = ({ nft, name }) => {
  // Attributes

  // Context

  // Methods

  // Component
  return (
    <>
      <Stack w="50px" h="50px" bg="black">
        
        {/* <Image
          src='../../../public/images/bases/01.svg'
          alt="border"
          zIndex={2}
          boxSize="fit-content"
        /> */}
        {/* <Image
          src={NFT_IMG.base[nft.properties.base]}
          alt="base"
          position="absolute"
          w="50px"
          h="50px"
          top="22.25%"
        />

        <Image
          src={NFT_IMG.center[nft.properties.center]}
          alt="center"
          position="absolute"
          w="15px"
          h="15px"
          top="29.25%"
          left="17.8%"
        />

        <Image
          src={NFT_IMG.ornament[nft.properties.ornament]}
          alt="ornament"
          position="absolute"
          w="36px"
          h="36px"
          top="25.25%"
          left="13.3%"
        />

        <VStack 
        position="absolute" 
        zIndex={5}
        top='20%'
        left='-10%'
        >
          <CurvedText
            text={ name == null ? nft.name : name}
            font={NFT_IMG.font[nft.properties.font].name}
            color={NFT_IMG.font[nft.properties.font].color}
            uppercase={NFT_IMG.font[nft.properties.font].uppercase}
            weight={NFT_IMG.font[nft.properties.font].weight}
            size={'8px'}
          />
        </VStack> */}
      </Stack>
    </>
  );
};
