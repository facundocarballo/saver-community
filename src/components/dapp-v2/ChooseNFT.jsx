import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  HStack,
  Spacer,
  Text,
  Button,
  Box,
  Image,
  useToast,
  useDisclosure,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import {
  buildTransaciont,
  MAIN_CURRENCY,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  URL_WEB,
} from "../../web3/funcs";
import { Loading } from "./loading";

export const ChooseNFT = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [nftSelected, setNftSelected] = React.useState(null);
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);
  const [finalMessage, setFinalMessage] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";

  // Context
  const {
    addressAccount,
    SinergyBronze,
    uploadChooseFavouriteNFT_Bronze,
  } = useProvider();

  // Methods
  const showCheckImg = (nft) => {
    return nftSelected == null
      ? nft.id == SinergyBronze.favouriteNFT.id
      : nft.id == nftSelected;
  };

  const handleCopyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);

    const elem = document.createElement("textarea");
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);

    toast({
      title: "Copiado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleChangeFavouriteNFT = async () => {
    const data = await SinergyBronze.contract.methods
      .SetFavouriteNFT(addressAccount, nftSelected)
      .encodeABI();
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
              await uploadChooseFavouriteNFT_Bronze();
              setLoading(false);
              setFinalMessage("Has cambiado tu NFT Favorito correctamente.");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
            }
          });
        }, 500);
      });
  };

  const getTotalRewardsFromMyNFTs = () => {
    let total = 0;
    SinergyBronze.myNFTs.map(
      (nft, _) => (total += Number(nft.activeRewardsClaimed))
    );
    return Number(total).toFixed(2);
  };

  // Component
  return (
    <>
    {/* Alerta de Transaccion Exitosa */}
    <AlertDialog
        isOpen={showFinalMessage}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowFinalMessage(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transaccion Exitosa"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">{finalMessage}</Text>
            </AlertDialogBody>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay>
          <ModalContent bg="gray.900">
            <ModalHeader color="white" fontSize="lg" fontWeight="bold">
              Elegir NFT Favorito
            </ModalHeader>

            <ModalBody w="full" bg="gray.900">
              {/* Desktop */}
              <VStack
                overflowY="auto"
                display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
              >
                {SinergyBronze.myNFTs.map((nft, idx) => {
                  if (idx == 0) {
                    return (
                      <VStack w="full" key={idx}>
                        <HStack w="full" key={idx}>
                          <Spacer />
                          <Text color="white">Recompensas</Text>
                          <Box w="10px" />
                        </HStack>
                        <Box h="5px" />
                        <HStack
                          w="full"
                          key={idx}
                          _hover={{
                            bg: "gray.800",
                            animationDuration: "3s",
                            borderRadius: "6px",
                          }}
                        >
                          <Box w="15px" />
                          <Box />
                          {showCheckImg(nft) ? (
                            <Image
                              src={checkImage}
                              alt="selected"
                              boxSize="30px"
                            />
                          ) : (
                            <Box
                              w="30px"
                              h="30px"
                              border="1px solid"
                              borderColor="gray"
                              borderRadius="6px"
                              onClick={() => setNftSelected(nft.id)}
                              cursor="pointer"
                            />
                          )}
                          <Text color="white">
                            {nft.name} {`(ID: ${nft.id})`}
                          </Text>
                          <Spacer />
                          <Text color="white">
                            Conectado con: {nft.reference}
                          </Text>
                          <Box w="50px" />
                          <Button
                            onClick={() =>
                              handleCopyToClipboard(
                                `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
                              )
                            }
                            variant="callToAction"
                            fontWeight="bold"
                          >
                            Copiar Link
                          </Button>
                          <Box w="70px" />
                          <Text color="white">
                            {Number(nft.activeRewardsClaimed).toFixed(2)} {MAIN_CURRENCY}
                          </Text>
                          <Box w="10px" />
                        </HStack>
                      </VStack>
                    );
                  } else {
                    return (
                      <VStack w="full" key={idx}>
                        <Box h="5px" />
                        <HStack
                          w="full"
                          key={idx}
                          _hover={{
                            bg: "gray.800",
                            animationDuration: "3s",
                            borderRadius: "6px",
                          }}
                        >
                          <Box w="15px" />
                          <Box />
                          {showCheckImg(nft) ? (
                            <Image
                              src={checkImage}
                              alt="selected"
                              boxSize="30px"
                            />
                          ) : (
                            <Box
                              w="30px"
                              h="30px"
                              border="1px solid"
                              borderColor="gray"
                              borderRadius="6px"
                              onClick={() => setNftSelected(nft.id)}
                              cursor="pointer"
                            />
                          )}
                          <Text color="white">
                            {nft.name} {`(ID: ${nft.id})`}
                          </Text>
                          <Spacer />
                          <Text color="white">
                            Conectado con: {nft.reference}
                          </Text>
                          <Box w="50px" />
                          <Button
                            onClick={() =>
                              handleCopyToClipboard(
                                `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
                              )
                            }
                            variant="callToAction"
                            fontWeight="bold"
                          >
                            Copiar Link
                          </Button>
                          <Box w="70px" />
                          <Text color="white">
                            {Number(nft.activeRewardsClaimed).toFixed(2)} {MAIN_CURRENCY}
                          </Text>
                          <Box w="10px" />
                        </HStack>
                      </VStack>
                    );
                  }
                })}
                <Box h="10px" />
                <Divider />
                <HStack w="full">
                  <Spacer />
                  <Text color="white">
                    Recompensas Totales: {getTotalRewardsFromMyNFTs()}{" "}
                    {MAIN_CURRENCY}
                  </Text>
                  <Box w="10px" />
                </HStack>
              </VStack>

              {/* Mobile */}
              <VStack
                overflowY="auto"
                display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
              >
                {SinergyBronze.myNFTs.map((nft, idx) => {
                  return (
                    <VStack w="full" key={idx}>
                      <Text color="white" fontSize='16px' fontWeight='bold'>
                          {nft.name} {`(ID: ${nft.id})`}
                        </Text>
                      <HStack w="full">
                        <Box w="15px" />
                        <Text color='white'>
                          {
                            showCheckImg(nft) ? "NFT Seleccionado" : "Seleccionar NFT"
                          }
                        </Text>
                        <Spacer />
                        {showCheckImg(nft) ? (
                          <Image
                            src={checkImage}
                            alt="selected"
                            boxSize="30px"
                          />
                        ) : (
                          <Box
                            w="30px"
                            h="30px"
                            border="1px solid"
                            borderColor="gray"
                            borderRadius="6px"
                            onClick={() => setNftSelected(nft.id)}
                            cursor="pointer"
                          />
                        )}
                        <Box w='15px' />
                      </HStack>
                      <HStack w="full">
                        <Box w="15px" />
                        <Text color="white">
                          Conectado con: {nft.reference}
                        </Text>
                        <Spacer />
                      </HStack>
                      <HStack w="full">
                        <Box w="15px" />
                        <Text>Recomepensas:</Text>
                        <Spacer />
                        <Text color="white">
                          {nft.activeRewardsClaimed} {MAIN_CURRENCY}
                        </Text>
                        <Box w="15px" />
                      </HStack>
                      <Text color="white">Link de Referencia:</Text>
                      <HStack w="full">
                        <Box w="15px" />
                        <Text color="white" fontSize='10px'>
                          {URL_WEB}/dapp/sinergyBronze/buyNFT/{nft.id}
                        </Text>
                        <Spacer />
                      </HStack>
                      <Button
                        onClick={() =>
                          handleCopyToClipboard(
                            `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
                          )
                        }
                        variant="callToAction"
                        fontWeight="bold"
                      >
                        Copiar Link
                      </Button>
                      <Box h="10px" />
                      <HStack w="full" h="1px" bg="gray.200" />
                      <Box h="10px" />
                    </VStack>
                  );
                })}
                <Box h="10px" />
                <Divider />
                <HStack w="full">
                  <Spacer />
                  <Text color="white">
                    Recompensas Totales: {getTotalRewardsFromMyNFTs()}{" "}
                    {MAIN_CURRENCY}
                  </Text>
                  <Box w="10px" />
                </HStack>
              </VStack>
            </ModalBody>

            <ModalFooter bg="gray.900">
              {loading ? (
                <Loading />
              ) : (
                <Button
                  variant="actionDapp"
                  ref={cancelRef}
                  onClick={handleChangeFavouriteNFT}
                  ml={3}
                  disabled={nftSelected == null}
                >
                  HACER FAVORITO
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <Button
        bg="blue.600"
        color="white"
        w="100px"
        _hover={{
          boxShadow: "1px 1px 100px #fff",
          transform: "scale(1.1)",
        }}
        onClick={onOpen}
      >
        Elegir NFT
      </Button>
    </>
  );
};
