import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Button,
  Heading,
  useDisclosure,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  buildTransaciont,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { useProvider } from "../../context";
import { Loading } from "./loading";

/*
props: {
    title: 'Sinergy Bronze',
    amountUSDT: string,
    amountCDA: string,
    amountABLE: string

}
*/
export const BRONZE_TITLE = "Sinergy Bronze";
export const SILVER_TITLE = "Sinergy Silver";
export const GOLD_TITLE = "Sinergy Gold";

export const SinergyResources = ({ props }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const colorCard = useColorModeValue("blue.300", "blue.400");

  // Context
  const { SinergyBronze, addressAccount, handleWeb3 } = useProvider();

  // Methods
  const handleClaimBronze = async () => {
    const data = await SinergyBronze.contract.methods.claimResources().encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SINERGY_BRONZE_CONTRACT_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              await handleWeb3();
              setLoading(false);
              // Mostrar PopUp
              onOpen();
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }
          });
        }, 500);
      });
  };

  const handleClaimSilver = async () => {};

  const handleClaimGold = async () => {};

  const handleClaim = async () => {
    if (props.title == BRONZE_TITLE) return await handleClaimBronze();
    if (props.title == SILVER_TITLE) return await handleClaimSilver();
    if (props.title == GOLD_TITLE) return await handleClaimGold();

    return null;
  };

  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transferencia Exitosa!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error ? <Text>Error, intentalo nuevamente.</Text> : null}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={onClose}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full" bg={colorCard} borderRadius={6}>
        <Box h="5px" />
        <Heading size="lg">{props.title}</Heading>
        <Box h="5px" />

        <HStack w="full">
          <Box w="10px" />
          <Heading size="md">{props.amountBUSD}</Heading>
          <Spacer />
          <Heading size="md">{props.amountCDA}</Heading>
          <Spacer />
          <Heading size="md">{props.amountABLE}</Heading>
          <Box w="10px" />
        </HStack>

        <Box h="5px" />

        {loading ? (
          <Loading />
        ) : (
          <Button variant="callToAction" onClick={handleClaim}>
            RECIBIR
          </Button>
        )}

        <Box h="10px" />
      </VStack>
    </>
  );
};
