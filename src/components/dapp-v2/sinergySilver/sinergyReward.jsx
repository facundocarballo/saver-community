import React from "react";
import {
  Image,
  Text,
  Button,
  VStack,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { IMG_TOROID } from "../../../images";
import { useProvider } from "../../../context";
import { buildTransaciont, SINERGY_SILVER_ADDRESS } from "../../../web3/funcs";
import { Loading } from "../loading";

/*
props: {
    title: "RECOMPENSAS PASIVAS",
    amount: 30,
    passive: true
}
*/
export const SinergyReward = ({ props }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const { SinergySilver, addressAccount, uploadNftReward_Silver, Qualified } =
    useProvider();

  // Methods
  const handleClaimPassiveRewards = async () => {
    const data = await SinergySilver.contract.methods
      .claimPassiveReward()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Silver();
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const handleClaimAffiliateReward = async () => {
    const data = await SinergySilver.contract.methods
      .claimReward(SinergySilver.favouriteNFT.id)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadNftReward_Silver();
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

  const disable_for_cls = () => props.passive ? !SinergySilver.can_claim_passive_rewards : false ;

  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Recompensa recibida!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error ? (
                <Text color="white">Error, intentalo nuevamente.</Text>
              ) : null}
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

      <VStack>
        <Text fontWeight="bold" color="blue.600">
          {props.title}
        </Text>

        <Image src={IMG_TOROID} alt="toroid" boxSize="150px" zIndex={10} />

        <VStack position="absolute" zIndex={10}>
          <Box h="75px" />

          <Text fontSize="25px" color="white" fontWeight="bold">
            {props.amount}
          </Text>
        </VStack>

        <Box h="5px" />

        {loading ? (
          <Loading />
        ) : (
          <Button
            variant="actionDapp"
            isDisabled={
              !Qualified.info.userQualified ||
              disable_for_cls()
            }
            onClick={
              props.passive
                ? handleClaimPassiveRewards
                : handleClaimAffiliateReward
            }
          >
            RECLAMAR
          </Button>
        )}

        {!Qualified.info.userQualified ? (
          <Text fontWeight="bold" color="red.400">
            El ciclo anterior lo cerraste descalificado.
          </Text>
        ) : disable_for_cls() ? (
          <Text fontWeight="bold" color="red.400">
            Todos tus NFTs plata deben poseer al menos 1 CLS.
          </Text>
        ) : null}
      </VStack>
    </>
  );
};
