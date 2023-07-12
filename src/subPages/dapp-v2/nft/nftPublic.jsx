import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  Box,
  Spinner,
  Link,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IMG_SINERGY_TITLE, IMG_NFT_TOKEN } from "../../../images";
import { useProvider } from "../../../context";
import { getNFT } from "../../../web3/funcs/sinergy/nft";
import { Loading } from "../../../components/dapp-v2/loading";

export const NFT_PUBLIC = ({ id }) => {
  // Attributes
  const [nft, setNft] = React.useState(null);
  // Context
  const { SinergyBronze, AbleSale, MigrationContract } = useProvider();

  // Methods
  const getMyNFT = async () => {
    if (
      SinergyBronze != null &&
      AbleSale != null &&
      MigrationContract != null
    ) {
      const n = await getNFT(
        SinergyBronze.contract,
        id,
        AbleSale.contract,
        MigrationContract
      );

      setNft(n);
    }
  };

  React.useEffect(() => {
    getMyNFT();
  }, []);

  // Component
  return (
    <VStack w="full" bg="black">
      <Image src={IMG_SINERGY_TITLE} alt="sinergy-title" />
      {nft == null ? (
        <Loading />
      ) : (
        <VStack bg="#3C3C3C" borderRadius={6}>
          <Box h="5px" />
          <HStack w="full">
            <Spacer />
            {/* <Image src={IMG_NFT_TOKEN} alt="nft-image" boxSize="50px" /> */}
            <Image src={nft.imageURL} alt="nft-image" w="150px" />
            <Spacer />
            <NextLink
              color="white"
              fontSize="20px"
              fontWeight="bold"
              href={`./${nft.id}`}
            >
              <Text color="white" fontSize="20px" fontWeight="bold">
                ID: {nft.id}
              </Text>
            </NextLink>
            <Spacer />
          </HStack>
          <Box w="full" h="2px" bg="black" />
          <Text color="white" fontSize="20px" fontWeight="bold">
            {nft.dateCreated}
          </Text>
          <HStack w="full">
            <Box w="5px" />
            <Text color="white">CONECTADO CON</Text>
            <Spacer />
            {/* <Text>ID: {nft.ref}</Text> */}
            <NextLink
              color="white"
              fontSize="20px"
              fontWeight="bold"
              href={`./${nft.directReferenceNFT}`}
            >
              <Text color="white">{nft.directReferenceNFT}</Text>
            </NextLink>
            <Box w="10px" />
          </HStack>
          <HStack w="full">
            <Box w="5px" />
            <Text>NFTs Conectados</Text>
            <Spacer />
            <Text color="white">{nft.references.total}</Text>
            <Box w="10px" />
          </HStack>
          <Link isExternal href={nft.valueProposal}>
            <Text color="white">VER PROPUESTA</Text>
          </Link>
          <Box h="5px" />
        </VStack>
      )}
    </VStack>
  );
};
