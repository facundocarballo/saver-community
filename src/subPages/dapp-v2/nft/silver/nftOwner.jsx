import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import { IMG_SINERGY_TITLE } from "../../../../images";
import { OwnerNFT_Card } from "../../../../components/dapp-v2/sinergySilver/ownerNFT-Card";
import { useProvider } from "../../../../context";
import { ShowLevelReferenceNFT } from "../../../../components/dapp-v2/showLevelReferenceNFT";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Loading } from "../../../../components/dapp-v2/loading";
import { SinergySilverCard } from "../../../../components/dapp-v2/cards/sinergySilver";

export const NFT_OWNER = ({ id }) => {
  // Attributes
  const [nft, setNft] = React.useState(null);

  // Context
  const { SinergySilver } = useProvider();

  // Methods
  const getMyNFT = () => {
    setNft(SinergySilver.favouriteNFT);
  };

  React.useEffect(() => {
    getMyNFT();
  }, []);

  // Component
  return (
    <>
      {nft == null ? (
        <Loading />
      ) : (
        <>
          {/* Desktop */}
          <VStack
            w="full"
            display={{ lg: "flex", md: "none", sm: "none", base: "none" }}
            bg="black"
          >
            <Box w='10px' />
            <HStack w="full">
              <Box w='10px' />
              <NextLink href="/dapp/sinergySilver">
                <Button>
                  <ArrowBackIcon  color='white' />
                </Button>
              </NextLink>
              <Spacer />
              <Image
                src={IMG_SINERGY_TITLE}
                alt="sinergy-title"
                cursor="pointer"
                w={{xl:"55%", lg: '60%'}}
              />
              <Spacer />
            </HStack>
            <Box h="25px" />

            {/* <SinergySilverCard nft={nft} owner={true} /> */}
            <OwnerNFT_Card nft={nft} />
            
            <Box h="10px" />
            {/* Mostramos los niveles de referencia */}
            <ShowLevelReferenceNFT nft={nft} level="Primer" />
            <ShowLevelReferenceNFT nft={nft} level="Segundo" />
            <ShowLevelReferenceNFT nft={nft} level="Tercer" />
            <ShowLevelReferenceNFT nft={nft} level="Cuarto" />
            <ShowLevelReferenceNFT nft={nft} level="Quinto" />
            <ShowLevelReferenceNFT nft={nft} level="Sexto" />
            <ShowLevelReferenceNFT nft={nft} level="Septimo" />
            <ShowLevelReferenceNFT nft={nft} level="Octavo" />
            <ShowLevelReferenceNFT nft={nft} level="Noveno" />
            <Box h="10px" />
          </VStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "flex", sm: "flex", base: "flex" }}
            bg="black"
          >
            <Box h='10px' />
            <HStack w="full">
              <Box w='10px' />
              <NextLink href="/dapp/SinergySilver">
                <Button variant='outline'>
                  <ArrowBackIcon />
                </Button>
              </NextLink>
              <Image
                src={IMG_SINERGY_TITLE}
                alt="sinergy-title"
                cursor="pointer"
                w='75%'
              />
            </HStack>
            <Box h="10px" />
            {/* <SinergySilverCard nft={nft} owner={true} /> */}
            <OwnerNFT_Card nft={nft} />
            <Box h="20px" />
            <ShowLevelReferenceNFT nft={nft} level="Primer" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Segundo" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Tercer" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Cuarto" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Quinto" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Sexto" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Septimo" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Octavo" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Noveno" />
            <Box h="10px" />
          </VStack>
        </>
      )}
    </>
  );
};
