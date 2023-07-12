import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  Box,
  Spinner,
  Image,
  Button,
  Heading,
} from "@chakra-ui/react";
import { IMG_SINERGY_TITLE } from "../../../images";
import { OwnerNFT_Card } from "../../../components/dapp-v2/ownerNFT-Card";
import { GeneralInfoNFT } from "../../../components/dapp-v2/generalInfoNFT";
import { useProvider } from "../../../context";
import { ShowLevelReferenceNFT } from "../../../components/dapp-v2/showLevelReferenceNFT";
import NextLink from "next/link";
import { ArrowBackIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Loading } from "../../../components/dapp-v2/loading";
import { SearchNFT } from "../searchNFT";

export const NFT_OWNER = ({ id }) => {
  // Attributes
  const [nft, setNft] = React.useState(null);

  // Context
  const { SinergyBronze } = useProvider();
  
  // Methods
  const getMyNFT = () => {
    setNft(SinergyBronze.favouriteNFT);
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
              <NextLink href="/dapp/sinergyBronze">
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

            <HStack w="full">
              <Box w="50px" />
              <OwnerNFT_Card nft={nft} />
              <Spacer />
              <Box w="50px" />
            </HStack>
            <Heading color="white">BUSCAR NFT</Heading>
            <SearchNFT Sinergy={SinergyBronze} generation="BRONZE" />
            <Box h="10px" />
            {/* Mostramos los niveles de referencia */}
            <ShowLevelReferenceNFT nft={nft} level="Primera" />
            <ShowLevelReferenceNFT nft={nft} level="Segunda" />
            <ShowLevelReferenceNFT nft={nft} level="Tercera" />
            <ShowLevelReferenceNFT nft={nft} level="Cuarta" />
            <ShowLevelReferenceNFT nft={nft} level="Quinta" />
            <ShowLevelReferenceNFT nft={nft} level="Sexta" />
            <ShowLevelReferenceNFT nft={nft} level="Septima" />
            <ShowLevelReferenceNFT nft={nft} level="Octava" />
            <ShowLevelReferenceNFT nft={nft} level="Novena" />
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
              <NextLink href="/dapp/sinergyBronze">
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
            <OwnerNFT_Card nft={nft} />
            <Box h="10px" />
            <Heading color="white">BUSCAR NFT</Heading>
            <SearchNFT Sinergy={SinergyBronze} generation="BRONZE" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Primera" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Segunda" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Tercera" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Cuarta" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Quinta" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Sexta" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Septima" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Octava" />
            <Box h="10px" />
            <ShowLevelReferenceNFT nft={nft} level="Novena" />
            <Box h="10px" />
          </VStack>
        </>
      )}
    </>
  );
};
