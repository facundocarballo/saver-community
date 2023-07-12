import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
const YOUTUBE_BASIC_URL = "https://youtu.be/";
export const SearchNFTCard = ({ nft }) => {
  // Attributes
  // Context
  // Methods
  const isYouTubeLink = (str) => String(str).includes(YOUTUBE_BASIC_URL);
  const getVideoID = (str) => String(str).substring(YOUTUBE_BASIC_URL.length);
  // Component
  return (
    <VStack
      border="2px"
      bg={nft.isRecover ? "yellow.400" : "red.300"}
      borderRadius={15}
      minW={{ lg: "550px", md: "550px", sm: "0px", base: "0px" }}
    >
      {!nft.isRecover ? (
        <>
          <Box h="10px" />
          <Text fontSize="30px" fontWeight="bold">
            NFT INHABILITADO
          </Text>
        </>
      ) : null}
      <HStack w="full">
        <Box w="15px" />
        <VStack>
          {/* Desktop */}
          <HStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            {/* Informacion */}
            <VStack>
              <HStack w="full">
                <Box w="15px" />
                <VStack w="full">
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontSize="25px" color="white">
                      {nft.name}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      ID: {nft.id}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      Descripcion: {nft.inscription}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      Conectado con: {nft.reference}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      {nft.references.total} Conexiones
                    </Text>
                  </HStack>
                </VStack>
                <Spacer />

                <Box w="15px" />
              </HStack>
            </VStack>
            <Spacer />
            <Image src={nft.imageURL} alt="nft-image" boxSize="250px" />
          </HStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Image src={nft.imageURL} alt="nft-image" boxSize="250px" />

            <HStack w="full">
              <Box w="5px" />
              <Text fontSize="25px" color="white">
                {nft.name}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                ID: {nft.id}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                Descripcion: {nft.inscription}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                Conectado con: {nft.reference}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                {nft.references.total} Conexiones
              </Text>
            </HStack>
            <Spacer />
          </VStack>
          
          {isYouTubeLink(nft.valueProposal) ? (
            <iframe
              width="325"
              height="215"
              src={
                "https://www.youtube.com/embed/" + getVideoID(nft.valueProposal)
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white" fontSize='10px'>
                Propuesta de valor: {nft.valueProposal}
              </Text>
            </HStack>
          )}
        </VStack>

        <Box w="15px" />
      </HStack>

      <Box h="2px" />
    </VStack>
  );
};
