import React from "react";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react";
import { USER_CONTRACT_ADDRESS, buildTransaciont } from "../../web3/funcs";
import { useProvider } from "../../context";
import { Loading } from './loading';

export const AlertUpdate = () => {
  // Attributes
  const cancelRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  // Context
  const { User, addressAccount, loadAble, loadSinergyBronze } = useProvider();
  // Methods
  const loadInfo = async () => {
    if (router.pathname.includes("sinergyBronze")) {
      await loadSinergyBronze();
    } else {
      await loadAble()
    }
  }
  const handleUpdate = async () => {
    const data = await User.contract.methods.Update(addressAccount).encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      USER_CONTRACT_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await loadInfo();
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
            }
          });
        }, 500);
      });
  };
  // Component
  return (
    <AlertDialog
      isOpen={isOpen && User != null && !User.is_updated}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Actualizar
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text color="white" fontSize="2xl">
              Debes actualizar tu cuenta en este ciclo para poder realizar
              operaciones dentro de la Dapp.
            </Text>
            <Box h="10px" />
            <Divider />
            <Box h="10px" />
          </AlertDialogBody>

          <AlertDialogFooter>
            {loading ? (
              <Loading />
            ) : (
              <Button
                variant="callToAction"
                onClick={handleUpdate}
                color="black"
              >
                Actualizar
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
