import React from "react";
import Head from "next/head";
import { CHAIN_ID } from "../../src/web3/funcs";
import { Box, VStack, Button, Image } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { NavBar } from "../../src/components/dapp-v2/navbar";
import { useProvider } from "../../src/context";
import { Info } from "../../src/subPages/dapp-v2/info";
import { VideoTest } from "../../src/subPages/dapp-v2/videoTest";
import { LoadAbleRewards } from "../../src/components/dapp-v2/LoadAbleRewards";
import { PersonalInfo } from "../../src/subPages/dapp-v2/personal-info";
import { RewardInfo } from "../../src/subPages/dapp-v2/reward-info";
import { AbleReward } from "../../src/subPages/dapp-v2/ableReward";
import { IMG_ABLE_SAVER_LOGO, IMG_SHADOW_DIVIDER } from "../../src/images";
import { ShowSaverSinergy } from "../../src/subPages/dapp-v2/showSaverSinergy";
import { MigrationAlert } from "../../src/components/dapp-v2/migrationAlert";
import { ConnectWallet } from "../../src/components/dapp-v2/connectWallet";
import { BuyCDA } from "../../src/components/dapp-v2/buyCDA";
import { AlertUpdate } from "../../src/components/dapp-v2/AlertUpdate";

const DappV2 = () => {
  // Attributes
  const [isOpen, setIsOpen] = React.useState(true);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const box_height = "30px";
  // Context
  const {
    loadAble,
    Able,
    chainID,
    showChangeCycle,
    setShowChangeCycle,
    theCycle,
    addressAccount,
    showAbleRewards,
    BaseReward
  } = useProvider();
  // Methods

  React.useEffect(() => {
    // Cada vez que se cambia una billetera se refresca toda la dapp.
    window.ethereum.on("accountsChanged", loadAble);
  }, []);

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

      {/* ALERTA DE MIGRACION */}
      <MigrationAlert />

      {/* ALERTA DE ACTUALIZACION */}
      <AlertUpdate />

      <Head>
        <title>Able Saver - Dapp</title>
        <meta name="description" content="Aplicacion oficial de Able Saver." />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>
      <Box h="15px" bg="black" />

      {addressAccount == null || BaseReward == null ? (
        <VStack bg="black" w="full">
          <Box h="10px" />
          <ConnectWallet />
          <Box h={{ lg: "0px", md: "149px", sm: "20px", base: "20px" }} />
        </VStack>
      ) : (
        <VStack w="full" bg="black">
          <NavBar />
          <Box h="25px" />
          <BuyCDA />
          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={box_height} />
          <PersonalInfo />
          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={box_height} />
          <Info />
          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />

          <Box h={box_height} />
          <RewardInfo />
          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={box_height} />
          {!showAbleRewards || Able.reward == null ? (
            <LoadAbleRewards />
          ) : (
            <>
              <AbleReward />
            </>
          )}

          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={box_height} />

          <VideoTest />

          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
          <Box h={box_height} />
          <ShowSaverSinergy />
          <Box h={box_height} />
          <Image
            src={IMG_SHADOW_DIVIDER}
            alt="shadow-divider"
            w="full"
            h="10px"
          />
        </VStack>
      )}
    </>
  );
};

export default DappV2;

/*

*/
