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
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getHourFromTimestampWEB } from "../../../web3/funcs/events/common";
import { Events } from "../sinergySilver/events";

export const NFTWinnerListCard = ({ nft }) => {
  // Attributes
  const [showConnections, setShowConnections] = React.useState(false);
  const cancelRef = React.useRef();
  // Context
  // Methods
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
        <HStack w="full">
          <Box w="10px" />
          <Text color="white" fontWeight="black">
            ID: {nft.id}
          </Text>
          <Spacer />
          <Events id={nft.id} wallet={nft.ownerAddress} msg={null} />
          <Box w="10px" />
        </HStack>

        <Text color="white" fontWeight="black">
          {nft.name}
        </Text>
        <Text color="white" fontWeight="black">
          Tiempo: {getHourFromTimestampWEB(nft.time_wasted_in_advertising_list)}
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
        <Box h="5px" />
      </VStack>
    </>
  );
};
