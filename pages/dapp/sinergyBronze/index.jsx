import React from "react";
import Head from "next/head";
import { CHAIN_ID } from "../../../src/web3/funcs";
import NextLink from "next/link";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  VStack,
  Heading,
  Box,
  HStack,
  Spacer,
  Image,
  Button,
} from "@chakra-ui/react";
import { useProvider } from "../../../src/context";
import {
  IMG_ABLE_SAVER_LOGO,
  IMG_NFT_TOKEN,
  IMG_SHADOW_DIVIDER,
  IMG_SINERGY_TREE,
} from "../../../src/images";
import { SinergyReward } from "../../../src/components/dapp-v2/sinergyReward";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { LoadInfo } from "../../../src/components/dapp-v2/loadInfo";
import { SinergyBronzeCard } from "../../../src/components/dapp-v2/cards/sinergyBronze";
import { SinergyList } from "../../../src/components/dapp-v2/sinergyList";
import { LoadSinergyRewards } from "../../../src/components/dapp-v2/LoadSinergyRewards";
import { LoadAbleSale } from "../../../src/components/dapp-v2/LoadAbleSale";
import { AlertUpdate } from "../../../src/components/dapp-v2/AlertUpdate";

const SinergyBronze = () => {
  // Attributes
  const [isOpen, setIsOpen] = React.useState(true);
  const onClose = () => setIsOpen(false);
  // Context
  const {
    loadSinergyBronze,
    addressAccount,
    SinergyBronze,
    chainID,
    AbleSale,
    showChangeCycle,
    setShowChangeCycle,
    theCycle,
    showSinergyRewards,
    showAbleSaleList,
    ValueReward,
    ConstancyReward,
    ConfidenceReward,
    User,
  } = useProvider();
  const cancelRef = React.useRef();
  // Methods
  React.useEffect(() => {
    // Cada vez que se cambia una billetera se refresca toda la dapp.
    window.ethereum.on("accountsChanged", loadSinergyBronze);
  }, []);

  const CanClaim = (is_qualified, has_claimed) => is_qualified && !has_claimed;

  const getValueRewardInfo = () => ({
    title: "RECOMPENSAS DE VALOR",
    subtitle: "En proporción a la cantidad de NFTs que tengas en tu cuenta. Cuantos mas NFTs tengas, mas recibiras de las Recompensas de Valor.",
    stablecoin: {
      total_amount: Number(ValueReward.stablecoin.raised_amount).toFixed(2),
      amount_to_claim: Number(ValueReward.stablecoin.amount_to_claim).toFixed(
        2
      ),
    },
    able: {
      total_amount: Number(ValueReward.able.raised_amount).toFixed(2),
      amount_to_claim: Number(ValueReward.able.amount_to_claim).toFixed(2),
    },
    idx: 0,
    funding: "Este bote se nutre de las compras de NFT. Con cada compra de NFT que se hace en la dapp, 3 DAI y 4 ABLE se transfieren a este bote para repartirse entre los usuarios calificados.",
    qualifing: ["1. Estar calificado dentro del juego de Able Saver."]
  });

  const getConstancyReward = () => ({
    title: "RECOMPENSAS DE CONSTANCIA",
    subtitle: "En proporción a la cantidad de Premios Able que hayas conseguido. Cuantos mas Premios Able tengas, mas recibiras de las Recompensas de Constancia.",
    stablecoin: {
      total_amount: Number(ConstancyReward.stablecoin.raised_amount).toFixed(2),
      amount_to_claim: Number(
        ConstancyReward.stablecoin.amount_to_claim
      ).toFixed(2),
    },
    able: {
      total_amount: Number(ConstancyReward.able.raised_amount).toFixed(2),
      amount_to_claim: Number(ConstancyReward.able.amount_to_claim).toFixed(2),
    },
    idx: 1,
    funding: "Este bote se nutre de las compras de NFT. Con cada compra de NFT que se hace en la dapp, 3 DAI y 4 ABLE se transfieren a este bote para repartirse entre los usuarios calificados. Este bote tiene la particularidad de que para empezar a ser repartido, debe esperar a que al menos 21 billeteras hayan recibido el Premio Able.",
    qualifing: ["1. Estar calificado dentro del juego de Able Saver.", "2. Recibir al menos una vez el Premio Able."]
  });

  const getConfidenceReward = () => ({
    title: "RECOMPENSAS DE CONFIANZA",
    subtitle: `Las billeteras con mas de ${ConfidenceReward.min_amount_able} ABLE, podran recibir recompensas de este bote.`,
    stablecoin: {
      total_amount: Number(ConfidenceReward.stablecoin.raised_amount).toFixed(2),
      amount_to_claim: Number(
        ConfidenceReward.stablecoin.amount_to_claim
      ).toFixed(2),
    },
    able: {
      total_amount: Number(ConfidenceReward.able.raised_amount).toFixed(2),
      amount_to_claim: Number(ConfidenceReward.able.amount_to_claim).toFixed(2),
    },
    idx: 2,
    funding: "Este bote se nutre de las compras de NFT. Con cada compra de NFT que se hace en la dapp, 3 DAI y 4 ABLE se transfieren a este bote para repartirse entre los usuarios calificados. Este bote tiene la particularidad de que se reparte en partes iguales entre todos las billeteras que cumplan con las condiciones.",
    qualifing: ["1. Estar calificado dentro del juego de Able Saver.", "2. Tener al menos 3690 Able.", "3. No haber transferido Able de forma directa en el ciclo anterior (solamente se permite transferir a traves de la lista de venta)."]
  });

  // Component
  return (
    <>
      {chainID != null ? (
        CHAIN_ID != chainID ? (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                {"Estas conectado en una red distinta a la de Moombeam"}
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                {
                  "Por favor, conectate a la Red de Moombeam para utilizar la Dapp correctamente"
                }
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} variant="info">
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null
      ) : null}

      <Head>
        <title>Synergy Bronze</title>
        <meta
          name="description"
          content="Aplicacion oficial de Able Saver. Sinergy Bronze."
        />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>

      {/* ALERTA DE CAMBIO DE CICLO */}
      <AlertDialog
        isOpen={showChangeCycle}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowChangeCycle(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cambio de ciclo
            </AlertDialogHeader>

            <AlertDialogBody>
              Del CICLO {theCycle - 1} pasamos al CICLO {theCycle}. Recomendamos
              que recargues el navegador para que tengas toda la informacion
              correcta.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setShowChangeCycle(false)} variant="info">
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* ALERTA DE ACTUALIZACION */}
      <AlertUpdate />

      {addressAccount == null ? (
        <VStack bg="black">
          <Heading color="yellow.400" fontSize={{ md: "6xl", sm: "2xl" }}>
            SYNERGY BRONZE
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
      ) : SinergyBronze.favouriteNFT == undefined ? (
        <VStack bg="black">
          <Heading
            color="yellow.400"
            fontSize={{ md: "6xl", sm: "4xl", base: "2xl" }}
          >
            SYNERGY BRONZE
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
      ) : !showSinergyRewards && !showAbleSaleList ? (
        <>
          <VStack bg="black" w="full">
            <Box h="25px" />
            <HStack w="full">
              <Box w="15px" />
              <NextLink href="/dapp">
                <Button>
                  <ArrowBackIcon />
                </Button>
              </NextLink>
            </HStack>
            <Heading
              color="yellow.400"
              fontSize={{ lg: "6xl", md: "6xl", sm: "5xl", base: "4xl" }}
            >
              SINERGY BRONZE
            </Heading>
            <Box h="10px" />
            <SinergyBronzeCard nft={SinergyBronze.favouriteNFT} owner={true} />
            <Box h="10px" />
            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <Box h="10px" />

            <LoadSinergyRewards />

            <Box h="10px" />

            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <LoadAbleSale />

            <Box h="50px" />

            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <Box h="10px" />
          </VStack>
        </>
      ) : showSinergyRewards && !showAbleSaleList ? (
        <VStack bg="black" w="full">
          <Box h="25px" />
          <HStack w="full">
            <Box w="15px" />
            <NextLink href="/dapp">
              <Button>
                <ArrowBackIcon />
              </Button>
            </NextLink>
          </HStack>
          <Heading
            color="yellow.400"
            fontSize={{ lg: "6xl", md: "6xl", sm: "5xl", base: "4xl" }}
          >
            SINERGY BRONZE
          </Heading>
          <Box h="10px" />
          <SinergyBronzeCard nft={SinergyBronze.favouriteNFT} owner={true} />
          <Box h="10px" />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Desktop */}
          <VStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <HStack w="full">
              <Spacer />
              <SinergyReward props={getValueRewardInfo()} />
              <Spacer />
              <Box w="25px" />
              <NextLink
                href={
                  SinergyBronze.amount > 0
                    ? `sinergyBronze/nft/${SinergyBronze.favouriteNFT.id}`
                    : ""
                }
              >
                <Image
                  src={IMG_SINERGY_TREE}
                  alt="sinergyTree"
                  boxSize="250px"
                  cursor="pointer"
                />
              </NextLink>
              <Spacer />
              <SinergyReward props={getConstancyReward()} />
              <Spacer />
            </HStack>
            <Box h="10px" />
            <SinergyReward props={getConfidenceReward()} />
          </VStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="10px" />
            <SinergyReward props={getValueRewardInfo()} />
            <NextLink
              href={
                SinergyBronze.amount > 0
                  ? `sinergyBronze/nft/${SinergyBronze.favouriteNFT.id}`
                  : ""
              }
            >
              <Image
                src={IMG_SINERGY_TREE}
                alt="sinergyTree"
                boxSize="250px"
                cursor="pointer"
              />
            </NextLink>
            <Box h="10px" />
            <SinergyReward props={getConstancyReward()} />
            <Box h="10px" />
            <SinergyReward props={getConfidenceReward()} />
            <Box h="10px" />
          </VStack>

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <LoadAbleSale />

          <Box h="50px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="10px" />
        </VStack>
      ) : !showSinergyRewards && showAbleSaleList ? (
        <>
          <VStack bg="black" w="full">
            <Box h="25px" />
            <HStack w="full">
              <Box w="15px" />
              <NextLink href="/dapp">
                <Button>
                  <ArrowBackIcon />
                </Button>
              </NextLink>
            </HStack>
            <Heading
              color="yellow.400"
              fontSize={{ lg: "6xl", md: "6xl", sm: "5xl", base: "4xl" }}
            >
              SINERGY BRONZE
            </Heading>
            <Box h="10px" />
            <SinergyBronzeCard nft={SinergyBronze.favouriteNFT} owner={true} />
            <Box h="10px" />
            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <Box h="10px" />

            <LoadSinergyRewards />

            <Box h="10px" />

            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <SinergyList
              turn={AbleSale.turn == 2}
              title="Lista Venta ABLE"
              nfts={AbleSale.sell_list}
            />

            <Box h="50px" />

            <SinergyList
              turn={AbleSale.turn != 2}
              title="Lista Venta ABLE (IMPULSADOS)"
              nfts={AbleSale.driven_list}
            />

            <Box h="100px" />

            <Image
              src={IMG_SHADOW_DIVIDER}
              alt="shadow-divider"
              w="full"
              h="10px"
            />

            <Box h="10px" />
          </VStack>
        </>
      ) : (
        <VStack bg="black" w="full">
          <Box h="25px" />
          <HStack w="full">
            <Box w="15px" />
            <NextLink href="/dapp">
              <Button>
                <ArrowBackIcon />
              </Button>
            </NextLink>
          </HStack>
          <Heading
            color="yellow.400"
            fontSize={{ lg: "6xl", md: "6xl", sm: "5xl", base: "4xl" }}
          >
            SINERGY BRONZE
          </Heading>
          <Box h="10px" />
          <SinergyBronzeCard nft={SinergyBronze.favouriteNFT} owner={true} />
          <Box h="10px" />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Desktop */}
          <VStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <HStack w="full">
              <Spacer />
              <SinergyReward props={getValueRewardInfo()} />
              <Spacer />
              <Box w="25px" />
              <NextLink
                href={
                  SinergyBronze.amount > 0
                    ? `sinergyBronze/nft/${SinergyBronze.favouriteNFT.id}`
                    : ""
                }
              >
                <Image
                  src={IMG_SINERGY_TREE}
                  alt="sinergyTree"
                  boxSize="250px"
                  cursor="pointer"
                />
              </NextLink>
              <Spacer />
              <SinergyReward props={getConstancyReward()} />
              <Spacer />
            </HStack>
            <Box h="10px" />
            <SinergyReward props={getConfidenceReward()} />
          </VStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="10px" />
            <SinergyReward props={getValueRewardInfo()} />
            <NextLink
              href={
                SinergyBronze.amount > 0
                  ? `sinergyBronze/nft/${SinergyBronze.favouriteNFT.id}`
                  : ""
              }
            >
              <Image
                src={IMG_SINERGY_TREE}
                alt="sinergyTree"
                boxSize="250px"
                cursor="pointer"
              />
            </NextLink>
            <Box h="10px" />
            <SinergyReward props={getConstancyReward()} />
            <Box h="10px" />
            <SinergyReward props={getConfidenceReward()} />
            <Box h="10px" />
          </VStack>

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <SinergyList
            turn={AbleSale.turn == 2}
            title="Lista Venta ABLE"
            nfts={AbleSale.sell_list}
          />

          <Box h="50px" />

          <SinergyList
            turn={AbleSale.turn != 2}
            title="Lista Venta ABLE (IMPULSADOS)"
            nfts={AbleSale.driven_list}
          />

          <Box h="100px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="10px" />
        </VStack>
      )}
    </>
  );
};

export default SinergyBronze;
