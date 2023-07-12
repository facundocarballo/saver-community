import {
  HStack,
  VStack,
  Text,
  Heading,
  Spacer,
  Box,
  Button,
  Image,
  Spinner,
  Container,
  useColorMode,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import Head from "next/head";
import {
  getDataToMigrate,
  migrateBDDF,
  migrateToXDAI,
  LIST_WALLETS,
} from "../src/migration/funcs";
import {
  buildTransaciont,
  CHAIN_ID,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
} from "../src/web3/funcs";
import { IMG_ABLE_SAVER_LOGO } from "../src/images";
import { useProvider } from "../src/context";
import { Loading } from '../src/components/dapp-v2/loading';

const Migration = () => {
  // React UseState Variables
  const [chainID, setChainID] = React.useState(null);
  const [communityData, setCommunityData] = React.useState(null);
  const [fastData, setFastData] = React.useState(null);
  // const [addressAccount, setAddressAccount] = React.useState(null);
  const [bddfAmount, setBddfAmount] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingMigration, setLoadingMigration] = React.useState(false);
  const [showPopUpMigration, setShowPopUpMigration] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(true);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef();

  // Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const photoSynergy = useColorModeValue(
    "https://i.ibb.co/swFGJPC/saver-community-road-map.png",
    "https://i.ibb.co/LR397tP/Captura-de-Pantalla-2022-06-11-a-la-s-19-49-22.png"
  );

  // Context
  const { Able, SinergyBronze, addressAccount, loadAble } = useProvider();

  // Handlers
  const handleGetData = async () => {
    setLoading(true);
    const data = await getDataToMigrate();

    setChainID(data.chainID);
    setCommunityData(data.communityData);
    setFastData(data.fastData);
    setBddfAmount(data.bddfAmount);
    setAddressAccount(data.addressAccount);

    setLoading(false);
  };

  const handleMigrate = async () => {
    setLoadingMigration(true);

    const donationBalanceETH =
      Number(communityData.donationBalance) + Number(fastData.donationBalance);

    const donationBalance = web3.utils.toWei(
      donationBalanceETH.toString(),
      "ether"
    );

    const allDonatesOfETH =
      Number(communityData.allDonatesOf) + Number(fastData.allDonatesOf);

    const allDonatesOf = web3.utils.toWei(allDonatesOfETH.toString(), "ether");

    const balanceOfETH =
      Number(communityData.balanceOf) + Number(fastData.balanceOf) + 369;

    const balanceOf = web3.utils.toWei(balanceOfETH.toString(), "ether");

    const stableCoinEarnedETH =
      Number(communityData.stableCoinEarned) +
      Number(fastData.stableCoinEarned);
    const stableCoinEarned = web3.utils.toWei(
      stableCoinEarnedETH.toString(),
      "ether"
    );

    const personalPurpose = communityData.personalPurpose;
    const communityPurpose = communityData.communityPurpose;

    const bddf = (Number(bddfAmount) + 369).toString();

    await migrateToXDAI(
      addressAccount,
      donationBalance,
      allDonatesOf,
      balanceOf,
      stableCoinEarned,
      personalPurpose,
      communityPurpose,
      bddf
    );

    setLoadingMigration(false);
  };

  const handleMigrateBDDF = async () => {
    await migrateBDDF(bddfAmount, addressAccount);
  };

  const getCleanAddress = (addres) => {
    const firstPart = addres.substring(0, 5);
    const secondPart = addres.substring(addres.length - 5, addres.length);

    return firstPart + "..." + secondPart;
  };

  const getCompensation = () => {
    if (!LIST_WALLETS.includes(addressAccount)) {
      return "0.00";
    }
    return "369";
  };

  const handleMigrateAbleSaver = async () => {
    setLoading(true);

    const data = await Able.contract.methods.migrate().encodeABI();
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }

            if (rec) {
              clearInterval(interval);
              setLoading(false);
            }
          });
        }, 500);
      });
  };

  const handleMigrateSinergy = async () => {
    setLoading(true);

    const data = await SinergyBronze.contract.methods.migrate().encodeABI();
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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }

            if (rec) {
              clearInterval(interval);
              setLoading(false);
            }
          });
        }, 500);
      });
  };

  const connectWallet = async () => {
    setLoading(true);

    await loadAble();

    setLoading(false);
  };

  return (
    <>
      {/* Alert Dialog (Migration) */}
      {/* PopUp Recover */}

      <Head>
        <title>Able Saver - {"MIGRACIÓN"}</title>
        <meta
          name="description"
          content="MIGRACIÓN de Saver Community a Able Saver."
        />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>

      {communityData != null && fastData != null && chainID != null ? (
        CHAIN_ID != chainID ? (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogHeader>
              {"Estas conectado en una red distinta a la de Moonbeam"}
            </AlertDialogHeader>
            <AlertDialogContent>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                {
                  "Por favor, conectate a la Red de Moonbeam para utilizar la Dapp correctamente"
                }
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} variant="info">
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <AlertDialog
            isOpen={showPopUpMigration}
            leastDestructiveRef={cancelRef}
            onClose={() => setShowPopUpMigration(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  <HStack w="full">
                    <Text fontWeight="bold">{"MIGRACIÓN a Moonbeam"}</Text>
                    <Spacer />
                    <Button
                      onClick={() => setShowPopUpMigration(false)}
                      bg="red.400"
                    >
                      <CloseIcon />
                    </Button>
                  </HStack>
                </AlertDialogHeader>

                <AlertDialogBody>
                  <VStack w="full">
                    <HStack w="full">
                      <Box w="15px" />
                      <Text fontWeight="bold" color="pink.400">
                        Saver Community
                      </Text>
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{communityData.donationBalance} BDD</Text>
                      <Box w="15px" />
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{communityData.balanceOf} SAVER1</Text>
                      <Box w="15px" />
                    </HStack>

                    <Divider />

                    <HStack w="full">
                      <Box w="15px" />
                      <Text fontWeight="bold" color="pink.400">
                        Saver Fast
                      </Text>
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{fastData.donationBalance} BDD</Text>
                      <Box w="15px" />
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{fastData.balanceOf} SAVERF</Text>
                      <Box w="15px" />
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{bddfAmount} BDDF</Text>
                      <Box w="15px" />
                    </HStack>

                    <Divider />

                    <HStack w="full">
                      <Box w="15px" />
                      <Text fontWeight="bold" color="pink.400">
                        Compensacion
                      </Text>
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{getCompensation()} ABLE</Text>
                      <Box w="15px" />
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>{getCompensation()} CDA</Text>
                      <Box w="15px" />
                    </HStack>

                    <Divider />

                    <HStack w="full">
                      <Box w="15px" />
                      <Text fontWeight="bold" color="pink.400">
                        Saver Able
                      </Text>
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>
                        {Number(fastData.donationBalance) +
                          Number(communityData.donationBalance) +
                          Number(bddfAmount)}{" "}
                        CDA
                      </Text>
                      <Box w="15px" />
                    </HStack>

                    <HStack w="full">
                      <Spacer />
                      <Text>
                        {Number(fastData.balanceOf) +
                          Number(communityData.balanceOf)}{" "}
                        ABLE
                      </Text>
                      <Box w="15px" />
                    </HStack>
                  </VStack>
                </AlertDialogBody>

                <AlertDialogFooter>
                  {!loadingMigration ? (
                    <Button
                      colorScheme="pink"
                      ref={cancelRef}
                      onClick={handleMigrate}
                      ml={3}
                      disabled={getCompensation() == "0.00"}
                    >
                      MIGRAR
                    </Button>
                  ) : (
                    <Spinner />
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )
      ) : null}

      <Head>
        <title>Saver Community - Migration</title>
        <meta
          name="description"
          content="MIGRACIÓN de Saver Community y Saver Fast a Moonbeam"
        />
        <meta name="image" content="https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png" />
      </Head>

      <Container maxW="100%" p={4} style={{ position: "fixed", zIndex: 100 }}>
        <HStack w="full">
          <Box w="15px" h="15px" />
          <Image
            src="https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png"
            alt="saverIcon"
            boxSize="50px"
          />
          <Box w="25px" />
          <Text
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
            fontWeight="bold"
            as="h1"
            fontSize={{ base: "lg", sm: "lg", md: "4xl" }}
            color="pink.400"
          >
            Saver Community
          </Text>
          <Spacer />
          {addressAccount == null ? (
            !loading ? (
              <Button variant="info" onClick={connectWallet}>
                Conectar Billetera
              </Button>
            ) : (
              <Loading />
            )
          ) : (
            <Button variant="info">
              {getCleanAddress(addressAccount)}
            </Button>
          )}

          <Box w="15px" />

          <Button onClick={toggleColorMode} variant="headers">
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Box w="15px" />
        </HStack>
      </Container>

      <Box h="100px" />

      <HStack w="full">
        <Spacer />
        <Heading color="blue.300">{"MIGRACIÓN"} a Moonbeam</Heading>
        <Spacer />
      </HStack>

      <Box h="15px" />

      <HStack w="full">
        <Box w="15px" />
        <Text align="justify" w="95%">
          {
            "Dentro de Binance Smart Chain el costo de gas por transacción se tornó demasiado costoso, e iba en contra de nuestra propuesta de valor que es llevar la mentalidad de ahorro a los usuarios de Saver Community. La red blockchain de Moonbeam tiene como criptomoneda nativa al GLMR cuyo valor está por debajo del dólar estadounidense. Por lo que el costo de gas en está red no sería un inconveniente (0.001 USD por transacción). Ádemas aprovechamos para implementar significativos cambios que produciran una mayor fluidez en las recompensas. Uno de ellos fue cambiar la concepción del juego de Saver, hacia un concepto más relacionado a las finanzas descentralizadas. Pasándose a llamar ahora Able Saver. También se ha agregado una sección complementaria con NFTs y sistema de referidos, llamada Saver Sinergy que hará de Saver Comunnity un proyecto más sostenible."
          }
        </Text>
        <Box w="15px" />
      </HStack>

      <Box h="5px" />

      <HStack w="full">
        <Box w="15px" />
        <Text
          fontStyle="italic"
          fontWeight="bold"
          fontFamily="serif"
          fontSize="15px"
        >
          Atentamente, Saver Community.
        </Text>
      </HStack>

      <Box h="65px" />

      {addressAccount == null && communityData == null && fastData == null ? (
        <VStack w="full">
          <Text>
            Por favor conecte su billetera para poder realizar la MIGRACIÓN
          </Text>
        </VStack>
      ) : (
        <VStack w="full">
          <Button
            onClick={handleMigrateAbleSaver}
            variant="info"
            w={{ lg: "50%", md: "65%", sm: "70%", base: "80%" }}
            fontWeight="bold"
            fontSize="lg"
          >
            MIGRAR ABLE SAVER
          </Button>

          <Box h="15px" />

          <Button
            onClick={handleMigrateSinergy}
            variant="info"
            w={{ lg: "50%", md: "65%", sm: "70%", base: "80%" }}
            fontWeight="bold"
            fontSize="lg"
          >
            MIGRAR SINERGY
          </Button>
        </VStack>
      )}

      <Box h="100px" />

      <HStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
      >
        <Spacer />
        <VStack>
          <Image
            src="https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png"
            alt="saverIcon"
            boxSize="250px"
          />
          <Text fontSize={{ base: "lg", sm: "lg", md: "4xl" }} color="pink.400">
            Saver Community
          </Text>
        </VStack>
        <Spacer />
        <VStack>
          <Image
            src="https://i.ibb.co/qChFmVn/saver-fast.png"
            alt="saverIcon"
            w="350px"
            h="250px"
          />
          <Text fontSize={{ base: "lg", sm: "lg", md: "4xl" }} color="blue.300">
            Saver Fast
          </Text>
        </VStack>
        <Spacer />
        <VStack>
          <Image
            src={IMG_ABLE_SAVER_LOGO}
            alt="saverIcon"
            w="250px"
            h="250px"
          />
          <Text
            fontSize={{ base: "lg", sm: "lg", md: "4xl" }}
            color="yellow.300"
          >
            Able Saver
          </Text>
        </VStack>
        <Spacer />
      </HStack>
    </>
  );
};

export default Migration;
