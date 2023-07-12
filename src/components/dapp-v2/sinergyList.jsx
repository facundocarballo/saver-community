import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Heading,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { NFTAdvertisingListCard } from "./cards/advertisingListCard";
import { NFTWaitingListCard } from "./cards/waitingListCard";
import { NFTWinnerListCard } from "./cards/winnerListCard";
import { NFTSaleList } from "./cards/saleList";

export const SinergyList = ({ title, nfts, turn }) => {
  // Attributes
  // Context
  // Methods
  const getNFTCard = (nft) => {
    if (title === "Lista de Propuesta")
      return <NFTAdvertisingListCard nft={nft} />;
    if (title === "Lista de Espera (NFT Repetidores)") return <NFTWaitingListCard nft={nft} />;
    if (title === "Lista de Ganadores") return <NFTWinnerListCard nft={nft} />;
    if (title === "Lista de Espera (NFT Nuevos)") return <NFTWaitingListCard nft={nft} />
    if (title === "Lista Venta ABLE") return <NFTSaleList nft={nft} symbol="ABLE" />
    if (title === "Lista Venta ABLE (IMPULSADOS)") return <NFTSaleList nft={nft} symbol="ABLE" />
    if (title === "Lista Venta TRIPLE") return <NFTSaleList nft={nft} symbol="TRIPLE" />
    if (title === "Lista Venta TRIPLE (IMPULSADOS)") return <NFTSaleList nft={nft} symbol="TRIPLE" />
    return <NFTAdvertisingListCard nft={nft} />;
  };
  // Component
  return (
    <>
      <Heading color={turn ? "green.400" : "white"}>{title}</Heading>
      <Divider />

      {nfts.length == 0 ? (
        <Text color="gray.400">No hay NFTs dentro de la {title}</Text>
      ) : (
        <>
          {/* Desktop */}
          <HStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
            overflowX="scroll"
          >
            {
              nfts.length <= 5 ? <Spacer /> : null
            }
            {nfts.map((nft, idx) => (
              <VStack key={idx}>
                <Box h='10px' />
                <HStack >
                  <Box w="10px" />
                  {getNFTCard(nft)}
                  <Box w="10px" />
                </HStack>
                <Box h='10px' />
              </VStack>
            ))}
            {
              nfts.length <= 5 ? <Spacer /> : null
            }
          </HStack>

          {/* Mobile */}
          <Accordion
            w="90%"
            allowToggle
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <HStack w="full">
                    <Box w="10px" />
                    <Text color="white">Visualizar NFTs</Text>
                    <Spacer />
                    <AccordionIcon color="white" />
                  </HStack>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <VStack
                  display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
                  w="full"
                >
                  {nfts.map((nft, idx) => (
                    <VStack w="full" key={idx}>
                      <Box h="10px" />
                      {getNFTCard(nft)}
                      <Box h="10px" />
                    </VStack>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </>
  );
};
