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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useProvider } from "../../../src/context";
import { BuyNFT } from "../../../src/components/dapp-v2/sinergySilver/buyNFT";
import { LoadInfo } from "../../../src/components/dapp-v2/loadInfo";
import {
  IMG_ABLE_SAVER_LOGO,
  IMG_NFT_SINERGY_SILVER,
  IMG_SHADOW_DIVIDER,
  IMG_SINERGY_TREE,
} from "../../../src/images";
import { SinergySilverCard } from "../../../src/components/dapp-v2/cards/sinergySilver";
import { SinergyReward } from "../../../src/components/dapp-v2/sinergySilver/sinergyReward";
import { SearchNFT } from "../../../src/subPages/dapp-v2/searchNFT";
import { SinergySilverList } from "../../../src/components/dapp-v2/sinergySilver/list";
import { QuitAbleSale } from "../../../src/components/dapp-v2/sinergySilver/quitAbleSale";
import { WinnerHistory } from "../../../src/components/dapp-v2/sinergySilver/winnerHistory";

const SinergySilver = () => {
  // Attributes
  // Context
  const {
    chainID,
    addressAccount,
    loadSinergySilver,
    SinergySilver,
    AbleSale,
  } = useProvider();
  const trackBG = "white";
  const filledBG = useColorModeValue("blue.300", "blue.200");
  const filledBG_close_waiting_list = useColorModeValue("red.300", "red.200");
  // Methods
  const getPassiveRewardInfo = () => ({
    title: "RECOMPENSAS PASIVAS",
    amount: SinergySilver.rewards.passiveReward.canClaim
      ? Number(SinergySilver.rewards.passiveReward.toClaim).toFixed(2)
      : "0.00",
    passive: true,
  });

  const getAffiliateReward = () => ({
    title: "RECOMPENSAS AFILIACION",
    amount: Number(SinergySilver.rewards.activeReward.toClaim).toFixed(2),
    passive: false,
  });

  const getActualCLPsAmount = () => {
    if (SinergySilver.waiting_list_state) {
      return (
        (SinergySilver.cls_total * 100) / SinergySilver.cls_range_max_value
      );
    } else {
    }
  };

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
        <title>Sinergy Silver</title>
        <meta
          name="description"
          content="Aplicacion oficial de Able Saver. Sinergy Silver."
        />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>
      {addressAccount == null || SinergySilver == null ? (
        <VStack bg="black">
          <Heading color="yellow.400" fontSize="6xl">
            SINERGY SILVER
          </Heading>
          <Box h="50px" />
          <LoadInfo
            img={IMG_NFT_SINERGY_SILVER}
            func={loadSinergySilver}
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
      ) : SinergySilver.favouriteNFT == undefined ? (
        <VStack bg="black">
          <Heading color="yellow.400" fontSize="6xl">
            SINERGY SILVER
          </Heading>
          <Box h="50px" />
          <LoadInfo
            img={IMG_NFT_SINERGY_SILVER}
            func={loadSinergySilver}
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
        <VStack bg="black" w="full">
          <Box h="25px" />

          <HStack w="full">
            <Box w="15px" />
            <NextLink href="/dapp">
              <Button>
                <ArrowBackIcon />
              </Button>
            </NextLink>
            <Spacer />
            <Heading color="yellow.400" fontSize="6xl">
              SINERGY SILVER
            </Heading>
            <Spacer />
          </HStack>

          <Box h="10px" />

          {/* Desktop */}
          <HStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <Spacer />
            <BuyNFT />
            <Spacer />
            <SinergySilverCard nft={SinergySilver.favouriteNFT} owner={true} />
            <Spacer />
          </HStack>

          <Box h="50px" />

          <Slider
            value={SinergySilver.cls_total}
            max={SinergySilver.cls_range_max_value}
            min={
              SinergySilver.waiting_list_state
                ? 0
                : SinergySilver.cls_range_min_value
            }
            h="50px"
            w="300px"
          >
            <SliderTrack bg={trackBG} h="50px" borderRadius={8}>
              <SliderFilledTrack
                bg={
                  SinergySilver.waiting_list_state
                    ? filledBG
                    : filledBG_close_waiting_list
                }
              />
              <VStack w="full" h="full" position="absolute">
                <Spacer />
                <HStack w="full">
                  <Box w="32%" />
                  <Text color="black" fontWeight="bold">
                    {SinergySilver.cls_total} /{" "}
                    {SinergySilver.cls_range_max_value} CLS
                  </Text>
                </HStack>
                <Spacer />
              </VStack>
            </SliderTrack>
          </Slider>

          <Box h="50px" />

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="20px" />
            <BuyNFT />
            <Box h="20px" />
            <SinergySilverCard nft={SinergySilver.favouriteNFT} owner={true} />
            <Box h="20px" />
          </VStack>

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Desktop */}
          <HStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <Spacer />
            <SinergyReward props={getPassiveRewardInfo()} />
            <Spacer />
            <Box w="25px" />
            <NextLink
              href={
                SinergySilver.amount > 0
                  ? `sinergySilver/nft/${SinergySilver.favouriteNFT.id}`
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
            <SinergyReward props={getAffiliateReward()} />
            <Spacer />
          </HStack>

          {/* Mobile */}
          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="10px" />
            <SinergyReward props={getPassiveRewardInfo()} />
            <NextLink
              href={
                SinergySilver.amount > 0
                  ? `sinergySilver/nft/${SinergySilver.favouriteNFT.id}`
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
            <SinergyReward props={getAffiliateReward()} />
            <Box h="10px" />
          </VStack>

          <Box h="50px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="50px" />

          {/* Lista de Propuesta */}
          <SinergySilverList
            title="Lista de Propuesta"
            nfts={SinergySilver.advertising_list}
          />

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Lista de Espera */}
          <SinergySilverList
            title="Lista de Espera (NFT Nuevos)"
            nfts={SinergySilver.first_waiting_list}
          />

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Lista de Espera */}
          <SinergySilverList
            title="Lista de Espera (NFT Repetidores)"
            nfts={SinergySilver.waiting_list}
          />

          <Box h="10px" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Lista de Ganadores */}
          <SinergySilverList
            title="Lista de Ganadores"
            nfts={SinergySilver.winner_list}
          />

          <Box h="10px" />

          <WinnerHistory msg="Historial de Ganadores" />

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          {/* Lista de Venta ABLE */}
          <SinergySilverList title="Lista Venta ABLE" nfts={AbleSale.list} />

          <Box h="10px" />

          {SinergySilver.favouriteNFT.is_in_able_sale ? <QuitAbleSale /> : null}

          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h="100px" />

          <Heading color="white">BUSCAR NFT</Heading>
          <SearchNFT Sinergy={SinergySilver} generation="SILVER" />

          <Box h="50px" />
        </VStack>
      )}
    </>
  );
};

export default SinergySilver;
