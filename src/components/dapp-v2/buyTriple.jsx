import React from "react";
import {
  VStack,
  Text,
  Box,
  Button,
  HStack,
  useDisclosure,
  Input,
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Image
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Loading } from "./loading";
import { useProvider } from "../../context";
import {
  buildTransaciont,
  MAIN_CURRENCY,
  STABLE_COIN_CONTRACT_ADDRESS,
  TRIPLE_SALE_ADDRESS,
} from "../../web3/funcs";
import { IMG_CDA_TOKEN } from "../../images";

const PRICE = 3;

export const BuyTriple = () => {
  // Attributes
  const [showInput, setShowInput] = React.useState(false);
  const [approve, setApprove] = React.useState(false);
  const [approving, setApproving] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [amountToSpend, setAmountToSpend] = React.useState("");
  const [finalMessage, setFinalMessage] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const colorRed = useColorModeValue("red.400", "red.500");
  // Context
  const { StableCoin, TripleSale, addressAccount, uploadBuyTriple } =
    useProvider();
  // Methods
  const handleApprove = async () => {
    const amount_wei = web3.utils.toWei(amountToSpend, "ether");
    const data = await StableCoin.contract.methods
      .approve(TRIPLE_SALE_ADDRESS, amount_wei)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      STABLE_COIN_CONTRACT_ADDRESS,
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }

            if (rec) {
              clearInterval(interval);
              setLoading(false);
              setApprove(true);
            }
          });
        }, 500);
      });
  };
  const handleBuyAble = async () => {
    const amount_wei = web3.utils.toWei(amount, "ether");
    const data = await TripleSale.contract.methods.buy(amount_wei).encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      TRIPLE_SALE_ADDRESS,
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              setShowInput(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }

            if (rec) {
              clearInterval(interval);
              await uploadBuyTriple();
              setLoading(false);
              setShowInput(false);
              setFinalMessage(`Has adquirido ${amount} TRIPLE.`);
              setAmount("");
              onOpen();
            }
          });
        }, 500);
      });
  };
  const handleSetAmount = (amount) => {
    setAmount(amount);
    setAmountToSpend((Number(amount) * PRICE).toFixed(2));
  };
  // Component
  return (
    <VStack>
      {/* Error - Transaccion Exitosa */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transaccion Exitosa!!"}
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

      {showInput ? (
        <HStack w="full">
          <Input
            value={amount}
            placeholder="Cantidad de TRIPLE"
            onChange={(e) => handleSetAmount(e.currentTarget.value)}
            borderColor={Number(amount) > 0 ? "pink.400" : colorRed}
            type="number"
            w="65%"
            h="50px"
            color="white"
          />
          {loading ? (
            <HStack>
              <Box w="10px" />
              <Loading />
            </HStack>
          ) : Number(amount) > 0 ? (
            approve ? (
              <Button
                variant="info"
                onClick={handleBuyAble}
                h="50px"
                w="25%"
                isDisabled={approving}
              >
                <Text>{"ADQUIRIR"}</Text>
              </Button>
            ) : (
              <Button
                variant="info"
                onClick={handleApprove}
                h="50px"
                w="25%"
                isDisabled={
                  approving ||
                  Number(TripleSale.total_able_selling) < Number(amount)
                }
              >
                <Text>{"APROBAR"}</Text>
              </Button>
            )
          ) : null}
          {amount == "" ? (
            <Button bg="red.500" h="50px" onClick={() => setShowInput(false)}>
              <CloseIcon />
            </Button>
          ) : null}
        </HStack>
      ) : (
        <>
          <Image src={IMG_CDA_TOKEN} alt="triple-img" boxSize="100px" />
          <Button variant="actionDapp" onClick={() => setShowInput(!showInput)}>
            ADQUIRIR TRIPLE EXT.
          </Button>
        </>
      )}

      {/* Advertencias */}
      {amount != "" ? (
        <Text color="yellow.400">Gastaras {amountToSpend} {MAIN_CURRENCY}</Text>
      ) : null}
      {Number(TripleSale.total_able_selling) < Number(amount) ? (
        <>
          <Text color="red.400" fontWeight="bold">
            No hay suficientes TRIPLE a la venta.
          </Text>
          <Text color="yellow.500" fontWeight="bold">
            {Math.trunc(Number(TripleSale.total_able_selling).toFixed(2))}{" "}
            TRIPLE Disponibles
          </Text>
        </>
      ) : null}
    </VStack>
  );
};
