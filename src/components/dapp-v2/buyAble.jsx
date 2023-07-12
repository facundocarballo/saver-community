import React from "react";
import {
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
  VStack,
  Image,
  Switch,
  Link,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Loading } from "./loading";
import { useProvider } from "../../context";
import {
  ABLE_SALE_ADDRESS,
  buildTransaciont,
  MAIN_CURRENCY,
  SINERGY_SALE_CONTRACT_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { IMG_ABLE_TOKEN } from "../../images";

export const BuyAble = () => {
  // Attributes
  const [showInput, setShowInput] = React.useState(false);
  const [approve, setApprove] = React.useState(false);
  const [approving, setApproving] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [increasePoints, setIncreasePoints] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [amountToSpend, setAmountToSpend] = React.useState("");
  const [finalMessage, setFinalMessage] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const colorRed = useColorModeValue("red.400", "red.500");

  const [showTermsConditions, setShowTermsConditions] = React.useState(false);
  // Context
  const { StableCoin, AbleSale, addressAccount, uploadBuyAble } = useProvider();
  // Methods
  const handleApprove = async () => {
    const amount_wei = web3.utils.toWei(
      String(Number(amountToSpend) + 0.01),
      "ether"
    );
    const data = await StableCoin.contract.methods
      .approve(SINERGY_SALE_CONTRACT_ADDRESS, amount_wei)
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
        setApproving(true);
        setLoading(true);
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
              setApproving(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }

            if (rec) {
              clearInterval(interval);
              setLoading(false);
              setApproving(false);
              setApprove(true);
            }
          });
        }, 500);
      });
  };
  const handleBuyAble = async () => {
    setShowTermsConditions(false);
    const amount_wei = web3.utils.toWei(amount, "ether");
    const data = await AbleSale.contract.methods
      .Buy(amount_wei, increasePoints)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SALE_CONTRACT_ADDRESS,
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
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              setShowInput(false);
              setApprove(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }

            if (rec) {
              clearInterval(interval);
              await uploadBuyAble();
              setLoading(false);
              setShowInput(false);
              setApprove(false);
              setFinalMessage(`Has adquirido ${amount} ABLE.`);
              setAmount("");
              onOpen();
            }
          });
        }, 500);
      });
  };
  const handleSetAmount = (amount) => {
    setAmount(amount);
    setAmountToSpend((Number(amount) * AbleSale.TOKEN_PRICE).toFixed(2));
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
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transaccion Exitosa!!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">
                {error ? "Error, intentalo nuevamente." : finalMessage}
              </Text>
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

      {/* Terms & Conditions */}
      <AlertDialog
        isOpen={showTermsConditions}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowTermsConditions(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {"Consentimiento"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">
                Al realizar esta operación, estoy aceptando el convenio aquí
                establecido.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Link
                isExternal
                href="https://saver-community.gitbook.io/es/"
                color="blue.400"
              >
                Ver Convenio
              </Link>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={handleBuyAble}
                ml={3}
              >
                Acepto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {showInput ? (
        <HStack w="full">
          <Input
            value={amount}
            placeholder="Cantidad de ABLE"
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
                onClick={() => setShowTermsConditions(true)}
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
                  Number(AbleSale.total_able_selling) < Number(amount)
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
        <HStack>
          <Image src={IMG_ABLE_TOKEN} alt="able-img" boxSize="50px" />
          <Button variant="actionDapp" onClick={() => setShowInput(!showInput)}>
            ADQUIRIR ABLE
          </Button>
        </HStack>
      )}
      <HStack>
        <Text color="white">
          {increasePoints ? "Ganar Puntos" : "No Ganar Puntos"}
        </Text>
        <Switch
          isChecked={increasePoints}
          size="lg"
          onChange={() => setIncreasePoints(!increasePoints)}
          colorScheme="green"
        />
      </HStack>
      <Box h="10px" />
      {/* Advertencias */}
      {amount != "" ? (
        <>
          <Text color="yellow.400">
            Gastaras {amountToSpend} {MAIN_CURRENCY}
          </Text>
          {increasePoints ? (
            <Text color="yellow.400">Sumaras {amountToSpend} Puntos</Text>
          ) : null}
        </>
      ) : null}

      {Number(AbleSale.total_able_selling) < Number(amount) ? (
        <>
          <Text color="red.400" fontWeight="bold">
            No hay suficientes ABLE a la venta.
          </Text>
          <Text color="yellow.500" fontWeight="bold">
            {Math.trunc(Number(AbleSale.total_able_selling).toFixed(2))} ABLE
            Disponibles
          </Text>
        </>
      ) : null}
    </VStack>
  );
};
