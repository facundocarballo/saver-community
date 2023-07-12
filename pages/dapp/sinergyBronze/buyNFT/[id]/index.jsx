import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  VStack,
  Spacer,
  Button,
  HStack,
  Box,
  Image,
  Input,
  useDisclosure,
  Text,
  Heading,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

import { useProvider } from "../../../../../src/context";
import {
  IMG_ABLE_SAVER_LOGO,
  IMG_NFT_TOKEN,
  IMG_SHADOW_DIVIDER,
  IMG_SINERGY_TITLE,
} from "../../../../../src/images";
import {
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  buildTransaciont,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
  MAIN_CURRENCY,
  ABLE_CONTRACT_ADDRESS,
} from "../../../../../src/web3/funcs";
import { Loading } from "../../../../../src/components/dapp-v2/loading";
import { LoadInfo } from "../../../../../src/components/dapp-v2/loadInfo";
import { AlertUpdate } from "../../../../../src/components/dapp-v2/AlertUpdate";

/*
export async function getStaticPaths() {
  const paths = [
    {
      params: {
        id: "0"
      }
    },
    {
      params: {
        id: "1"
      }
    },
    {
      params: {
        id: "2"
      }
    },
    {
      params: {
        id: "3"
      }
    },
    {
      params: {
        id: "4"
      }
    },
    {
      params: {
        id: "5"
      }
    },
    {
      params: {
        id: "6"
      }
    },
    {
      params: {
        id: "7"
      }
    },
    {
      params: {
        id: "8"
      }
    },
    {
      params: {
        id: "9"
      }
    },
    {
      params: {
        id: "10"
      }
    },
    {
      params: {
        id: "11"
      }
    }
  ];

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps() {
  return {
    id: "9"
  }
}
*/

export default function BuyNFT_Affiliate() {
  // Attributes
  const [name, setName] = React.useState("");
  const [inscription, setInscription] = React.useState("");
  const [valueProposal, setValueProposal] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [approveBUSD, setApproveBUSD] = React.useState(false);
  const [approveABLE, setApproveABLE] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const router = useRouter();
  const tokenID = router.query.id;

  // Context
  const {
    SinergyBronze,
    addressAccount,
    Able,
    StableCoin,
    uploadBuyNFT_Bronze,
    loadSinergyBronze,
  } = useProvider();

  // Methods
  const handleBuyNFT = async () => {
    const timestamp = Date.now();

    const data = await SinergyBronze.contract.methods
      .CreateNFT(
        name,
        inscription,
        valueProposal,
        SinergyBronze.nextNFT.jsonURL,
        SinergyBronze.nextNFT.imageURL,
        tokenID,
        timestamp
      )
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SINERGY_BRONZE_CONTRACT_ADDRESS,
      data
    );

    setLoading(true);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        if (loading) {
          window.document.getElementById("loading").innerHTML =
            "Esperando confirmacion de Red...";
        }

        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadBuyNFT_Bronze();
              setLoading(false);
              setInscription("");
              setName("");
              setValueProposal("");
              setApproveABLE(false);
              setApproveBUSD(false);
              // Mostrar PopUp
              onOpen();
              // Recargar datos de la blockchain (como si fuera que toca el boton de actualizar)
            }

            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const handleApproveBUSD = async () => {
    const amountWEI = web3.utils.toWei("36", "ether");
    const data = await StableCoin.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      STABLE_COIN_CONTRACT_ADDRESS,
      data
    );
    setLoading(true);
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
            if (rec) {
              clearInterval(interval);
              setApproveBUSD(true);
              setLoading(false);
            }

            if (err) {
            }
          });
        }, 500);
      });
  };

  const handleApproveCDA = async () => {
    const amountWEI = web3.utils.toWei("3", "ether");
    const data = await CDA.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      CDA_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              setApproveCDA(true);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
            }
          });
        }, 500);
      });
  };

  const handleApproveABLE = async () => {
    const amountWEI = web3.utils.toWei("12", "ether");
    const data = await Able.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              setApproveABLE(true);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
            }
          });
        }, 500);
      });
  };

  const is_troncal = () => {
    if (tokenID >= 0 && tokenID <= 8) return true;
    return false;
  };

  // Component
  return (
    <>
      {/* Alerta Creacion Exitosa del NFT */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Creacion Exitosa!!"}
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

      {/* Alerta de Actualizacion */}
      <AlertUpdate />

      <Head>
        <title>Synergy Bronze - Create NFT</title>
        <meta name="description" content="Crea tu NFT." />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>

      {is_troncal() ? (
        <VStack bg="black">
          <Heading color="yellow.400" fontSize={{ md: "6xl", sm: "4xl" }}>
            SYNERGY BRONZE
          </Heading>
          <Box h="50px" />
          <Text color='white'>Los NFTs troncales no puede recibir conexiones directas.</Text>
          <Box h="100px" />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={{ lg: "300px", md: "370px", sm: "390px", base: "10px" }} />
        </VStack>
      ) : addressAccount == null ? (
        <VStack bg="black">
          <Heading color="yellow.400" fontSize={{ md: "6xl", sm: "4xl" }}>
            SINERGY BRONZE
          </Heading>
          <Box h="50px" />
          <LoadInfo
            img={IMG_NFT_TOKEN}
            func={loadSinergyBronze}
            msg="Conectar Billetera"
          />
          <Box h="100px" />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={{ lg: "300px", md: "370px", sm: "390px", base: "10px" }} />
        </VStack>
      ) : (
        <>
          <VStack w="full" bg="black">
            <Image
              src={IMG_SINERGY_TITLE}
              alt="sinergyTitle"
              boxSize={{ lg: "50%", md: "70%", sm: "full", base: "full" }}
            />
            <Box h="10px" />
            <Heading color="white">Vinculado con</Heading>
            <Text color="white">NFT ID: {tokenID}</Text>

            <Box h="3px" w="80%" bg="white" />

            <HStack w="full">
              <Spacer />
              <Text color="white">Nombre</Text>
              <Spacer />
            </HStack>

            <HStack w="full">
              <Spacer />
              <Input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Nombre de tu NFT"
                w={{ lg: "50%", md: "57%", sm: "90%", base: "95%" }}
                color="white"
              />
              <Spacer />
            </HStack>

            <HStack w="full">
              <Spacer />
              <Text color="white">Descripcion de tu NFT</Text>
              <Spacer />
            </HStack>

            <HStack w="full">
              <Spacer />
              <Input
                value={inscription}
                onChange={(e) => setInscription(e.currentTarget.value)}
                placeholder="Descripcion"
                w={{ lg: "50%", md: "57%", sm: "90%", base: "95%" }}
                color="white"
              />
              <Spacer />
            </HStack>

            <HStack w="full">
              <Spacer />
              <Text color="white">Propuesta de valor (OPCIONAL)</Text>
              <Spacer />
            </HStack>

            <HStack w="full">
              <Spacer />
              <Input
                value={valueProposal}
                onChange={(e) => setValueProposal(e.currentTarget.value)}
                placeholder="URL que representara a tu propuesta de valor"
                w={{ lg: "50%", md: "57%", sm: "90%", base: "95%" }}
                color="white"
              />
              <Spacer />
            </HStack>

            <HStack w="full">
              {loading ? (
                <HStack w="full">
                  <Spacer />
                  <Loading />
                  <Spacer />
                </HStack>
              ) : !approveABLE ? (
                <VStack w="full">
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveABLE}
                    ml={3}
                    isDisabled={Number(Able.balance) < 12}
                  >
                    Aprobar 12 ABLE
                  </Button>
                  <Text color="red">
                    {Number(Able.balance) < 12
                      ? `No tienes suficientes ABLE para adquirir un NFT | ${Number(
                          Able.balance
                        )}`
                      : null}
                  </Text>
                </VStack>
              ) : !approveBUSD ? (
                <VStack w="full">
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveBUSD}
                    ml={3}
                    isDisabled={Number(StableCoin.balance) < 36}
                  >
                    Aprobar 36 {MAIN_CURRENCY}
                  </Button>
                  <Text color="red">
                    {Number(StableCoin.balance) < 36
                      ? `No tienes suficientes ${MAIN_CURRENCY} para adquirir un NFT | ${Number(
                          StableCoin.balance
                        )}`
                      : null}
                  </Text>
                </VStack>
              ) : (
                <VStack w="full">
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleBuyNFT}
                    ml={3}
                  >
                    CREAR NFT
                  </Button>
                </VStack>
              )}
              <Spacer />
            </HStack>

            <Heading color="white">Previsualizacion del NFT</Heading>
            <Image
              src={SinergyBronze.nextNFT.imageURL}
              alt="nft-image"
              w="500px"
            />
          </VStack>
        </>
      )}
    </>
  );
}
