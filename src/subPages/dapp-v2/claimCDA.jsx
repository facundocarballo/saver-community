import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Button,
  Input,
  Text,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import {
  buildTransaciont,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  STABLE_COIN_FORMAT,
} from "../../web3/funcs";
import { IMG_PIGGY_SAVER } from "../../images";
import { Loading } from "../../components/dapp-v2/loading";

export const ClaimCDA = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [amountToConvert, setAmountToConvert] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef();

  // Context
  const { addressAccount, Able, uploadWithdrawCDA } = useProvider();

  // Methods
  const handleConvert = async () => {
    const amountToConvertWEI = web3.utils.toWei(
      amountToConvert,
      STABLE_COIN_FORMAT
    );

    const data = await Able.contract.methods
      .convertCDAtoCDAToken(amountToConvertWEI)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SAVER_TOKEN_CONTRACT_ADDRESS,
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
            window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);

              await uploadWithdrawCDA();

              setIsOpen(true);

              setLoading(false);
            }
            if (err) {
              clearInterval(interval);
              console.log("ERROR: ", err);
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
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogHeader>{"Enhorabuena!!"}</AlertDialogHeader>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {`Has convertido ${amountToConvert} TRIPLE INT. en TRIPLE EXT.`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="info">
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DESKTOP */}
      <HStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
      >
        <Box w="75px" />
        <VStack>
          <HStack w="full">
            <Heading color="yellow.400" fontSize={{ lg: "3xl", base: "22px" }}>
              RETIRA TUS TRIPLE EXT. A TU BILLETERA
            </Heading>
            <Spacer />
          </HStack>
          <HStack>
            <Input
              value={amountToConvert}
              onChange={(e) => setAmountToConvert(e.currentTarget.value)}
              placeholder="Cantidad de TRIPLE INT."
              borderColor="blue.400"
              bg="white"
              color="black"
              borderRadius={6}
              w={{ lg: "400px", md: "300px", sm: "full", base: "full" }}
            />
            <Box w="20px" />
            {!loading ? (
              <Button variant="actionDapp" onClick={handleConvert} w="250px" 
              isDisabled={!Able.reward.ableReward.isWinner}
              >
                <Text>Recibir TRIPLE EXT.</Text>
              </Button>
            ) : (
              <Loading />
            )}
          </HStack>
          <HStack w="full">
            <Text color="white">{'(Los decimales con ".")'}</Text>
          </HStack>
        </VStack>
        <Spacer />
        <Image
          src={IMG_PIGGY_SAVER}
          alt="saverToken"
          boxSize={{ lg: "200px", md: "150px" }}
        />
        <Box w="175px" />
      </HStack>

      {/* MOBILE */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
      >
        <HStack w="full">
          <Box w="5px" />
          <Heading color="yellow.400" fontSize={{ lg: "3xl", base: "22px" }}>
            RETIRA TUS TRIPLE EXT. A TU BILLETERA
          </Heading>
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Input
            value={amountToConvert}
            onChange={(e) => setAmountToConvert(e.currentTarget.value)}
            placeholder="Cantidad de TRIPLE INT."
            borderColor="blue.400"
            bg="white"
            borderRadius={6}
            color="black"
            w="full"
          />
          <Box w="20px" />
          {!loading ? (
            <Button variant="actionDapp" onClick={handleConvert} w="270px">
              <Text>Recibir TRIPLE EXT.</Text>
            </Button>
          ) : (
            <Loading />
          )}
          <Box w="5px" />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Text color="white">{'(Los decimales con ".")'}</Text>
        </HStack>
        <Image src={IMG_PIGGY_SAVER} alt="saverToken" boxSize="200px" />
      </VStack>
    </>
  );
};
