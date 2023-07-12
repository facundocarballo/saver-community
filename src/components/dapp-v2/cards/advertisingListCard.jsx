import React from "react";
import {
  VStack,
  HStack,
  Box,
  Spacer,
  Text,
  Image,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { getHourFromTimestampWEB } from "../../../web3/funcs/events/common";
import { Events } from "../sinergySilver/events";
import { ArrowRightIcon } from "@chakra-ui/icons";

const YOUTUBE_BASIC_URL = "https://youtu.be/";

export const NFTAdvertisingListCard = ({ nft }) => {
  // Attributes
  const [showConnections, setShowConnections] = React.useState(false);
  const cancelRef = React.useRef();
  // Context
  // Methods
  const getVideoID = (url) => url.substring(YOUTUBE_BASIC_URL.length);

  const printArray = (arr) => {
    let str = "[ ";
    arr.forEach((element, idx) => {
      str += element;
      if (idx != arr.length - 1) {
        str += ", ";
      }
    });
    str += " ]";

    return str;
  };

  const existIn = (elem, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (elem == arr[i]) return true;
    }
    return false;
  };
  // Component
  return (
    <>
      {/* Mostrar Conexiones */}
      <AlertDialog
        isOpen={showConnections}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowConnections(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            ></AlertDialogHeader>
            <AlertDialogBody>
              {nft.last_ids_connections.length > 0 ? (
                <>
                  <Heading fontSize="3xl">Ultimas Conexiones</Heading>
                  {nft.last_ids_connections.map((id, idx) => (
                    <>
                      <Text fontSize="15px" color="yellow.400" key={idx}>
                        NFT: {id} ID
                      </Text>
                      <Box key={idx} h="3px" />
                      <Divider key={idx} />
                    </>
                  ))}
                </>
              ) : null}

              <Box h="10px" />

              <Heading fontSize="3xl">Todas las Conexiones</Heading>
              {nft.all_ids_connections.map((id, idx) => (
                <>
                  <Text key={idx}>NFT: {id} ID</Text>
                  <Box key={idx} h="3px" />
                  <Divider key={idx} />
                </>
              ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={() => setShowConnections(false)}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack
        w="280px"
        border="2px"
        borderRadius={10}
        shadow="1px 1px 10px #fff"
        _hover={{
          shadow: "1px 11px 30px #fff",
        }}
      >
        <Image src={nft.imageURL} alt="imageURL" boxSize="250px" />

        <Text color="white" fontWeight="bold">
          {nft.description}
        </Text>
        <Box h="10px" />
        {nft.value_proposal.startsWith(YOUTUBE_BASIC_URL) ? (
          <iframe
            width="235"
            height="150"
            src={
              "https://www.youtube.com/embed/" + getVideoID(nft.value_proposal)
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <VStack
            width="235"
            height="150"
            border="1px #fff"
            borderRadius="10px"
            shadow="1px 1px 4px #ccc"
          >
            <Spacer />
            <Text color="white" fontWeight="bold">
              {nft.value_proposal}
            </Text>
            <Spacer />
          </VStack>
        )}


        <HStack w="full">
          <Box w="10px" />
          <Text color='yellow.400' fontWeight="black">
            POS: {nft.pos}
          </Text>
          <Spacer />
          <Text fontWeight="black" color="white">
            ID: {nft.id}
          </Text>
          <Spacer />
          <Events id={nft.id} wallet={nft.ownerAddress} msg={null} />
          <Box w="10px" />
        </HStack>

        <Text fontSize='29px' fontWeight="black" color="white">
          {nft.name}
        </Text>
        <HStack w="full">
          <Spacer />
          <Button
            _hover={{
              shadow: "1px 1px 20px #fff",
              transform: "scale(1.1)",
            }}
            bg="black"
            shadow="1px 1px 10px #ddd"
            color="white"
            fontWeight="black"
            onClick={() => setShowConnections(true)}
          >
            {nft.connections_in_advertising_list} Conexion
            {nft.connections_in_advertising_list > 1 ? "es" : ""}
          </Button>
          <Spacer />
        </HStack>
        <Text fontWeight="black" color="white">
          Termina en {getHourFromTimestampWEB(nft.time_to_end_advertising_list)}
        </Text>
      </VStack>
    </>
  );
};
