import React from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Image,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { IMG_NFT_TOKEN } from "../../images";
import NextLink from "next/link";
import { URL_WEB } from "../../web3/funcs";

export const NftPrivateCard = ({ nft }) => {
  // Attributes
  // Context
  // Methods
  const isURL = (str) => {
    return String(str).startsWith("https://");
  };
  // Component
  return (
    <VStack bg="#3C3C3C" borderRadius={6}>
      <Box h='10px' />
      <Text color="white" fontSize="12px" fontWeight="bold">
        ID: {nft.id}
      </Text>
      <Box h='10px' />
    </VStack>
  );
  return (
    <VStack bg="#3C3C3C" borderRadius={6}>
      <Box h="5px" />
      <HStack w="full">
        <Spacer />
        <Image src={nft.imageURL} alt="nft-image" w="150px" />
        <Spacer />
        <NextLink
          color="white"
          fontSize="20px"
          fontWeight="bold"
          href={`./${nft.id}`}
        >
          <Text color="white">{nft.id}</Text>
        </NextLink>
        <Spacer />
      </HStack>
      <Text color="white" fontSize="12px" fontWeight="bold">
        Nombre: {nft.name}
      </Text>
      <Box w="full" h="2px" bg="black" />
      <Text color="white" fontSize="12px" fontWeight="bold">
        Descripcion: {nft.inscription}
      </Text>
      <Box w="full" h="2px" bg="black" />
      <Text color="white" fontSize="20px" fontWeight="bold">
        {nft.dateCreated}
      </Text>
      <HStack w="full">
        <Box w="5px" />
        <Text color="white">CONECTADO CON</Text>
        <Spacer />
        <NextLink href={`./${nft.ref}`}>
          <Text fontSize="20px" fontWeight="bold" color="white">
            {nft.ref}
          </Text>
        </NextLink>
        <Box w="10px" />
      </HStack>
      <HStack w="full">
        <Box w="5px" />
        <Text color="white">NFTs Conectados</Text>
        <Spacer />
        <Text color="white">{nft.total_amount_references}</Text>
        <Box w="10px" />
      </HStack>
      {
        <Link
          isExternal
          href={
            isURL(nft.valueProposal)
              ? nft.valueProposal
              : `${URL_WEB}/dapp/buyNFT/${nft.id}`
          }
        >
          <Text color="white">VER PROPUESTA</Text>
        </Link>
      }
      <Box h="5px" />
    </VStack>
  );
};
