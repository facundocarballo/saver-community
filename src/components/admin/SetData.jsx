import React from "react";
import {
  VStack,
  Text,
  Divider,
  Box,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const SetData = ({ title, actual_value, func, have_params }) => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  // Context
  // Methods
  const GetNewActualValue = () => {
    if (actual_value == "Si") return "No";
    if (actual_value == "No") return "Si";
  }
  const handler = async () => {
    setLoading(true);
    let params = null;
    if (have_params) {
      params = await func(value);
    } else {
      params = await func();
    }

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              setMsg(err);
              setValue("");
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }

            if (rec) {
              clearInterval(interval);
              setMsg(`Se cambio ${title} de ${actual_value} a ${value != "" ? value : GetNewActualValue()}`);
              setValue("");
              onOpen();
            }
          });
        }, 500);
      });
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
              {error ? "Ocurrio un Error." : "Transaccion realizada con exito."}
            </AlertDialogHeader>

            <AlertDialogBody>{msg}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack border="2px" borderColor="blue.400" borderRadius={10}>
        <Box h="10px" />
        <Text fontSize="20px" fontWeight="bold" color="white">
          {title}
        </Text>
        <Box h="10px" />
        <Divider />
        <Box h="10px" />
        <Text fontSize="20px" fontWeight="bold" color="white">
          Valor actual
        </Text>
        <Box h="10px" />
        <Text fontSize="20px" fontWeight="bold" color="white">
          {actual_value}
        </Text>
        <Divider />
        {have_params ? (
          <Input
            w="95%"
            color="white"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Valor actual"
          />
        ) : null}
        <Box h="10px" />
        <Button variant="callToAction" onClick={handler}>
          Cambiar Valor
        </Button>
        <Box h="10px" />
      </VStack>
    </>
  );
};
