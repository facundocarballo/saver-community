import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Image,
  Box,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Input,
  Link,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { ERC20 } from "./ERC20";
import {
  IMG_ABLE_TOKEN,
  IMG_CIRCLE_ZEN,
  IMG_FIRE,
  IMG_FIRE_BLUE,
  IMG_GLMR,
  IMG_USDC_TOKEN,
  IMG_USDT_TOKEN,
} from "../../images";
import {
  ABLE_CONTRACT_ADDRESS,
  buildTransaciont,
  MAIN_CURRENCY,
  SAVER_TOKEN_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { Loading } from "./loading";

export const Triangle = () => {
  const { uploadBuyAble, USDC, Able, USDT, BaseReward, addressAccount, User } =
    useProvider();
  const [loading_burn, setLoadingBurn] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [finalMessage, setFinalMessage] = React.useState("");
  const [burn_amount, setBurnAmount] = React.useState("");

  const [showTermsConditions, setShowTermsConditions] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  // Triangle Images
  const qualifiedImage = "https://i.ibb.co/7G0nHrm/triangulo-green.png";
  const notQualifiedImage = "https://i.ibb.co/Z1QKmtC/triangulo-red.png";

  // Token Images
  const saverImage = IMG_ABLE_TOKEN;
  const USDCImage = "https://i.ibb.co/mzdkGpd/usdc.png";

  // Colors
  const color = "white";

  // Handlers
  const formatAmount = (amount) => {
    // > 1 Billion
    if (amount / 1000000000 >= 1)
      return `${Number(amount / 1000000000).toFixed(2)}B`;
    // > 1Million
    if (amount / 1000000 >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
    // > 100K
    if (amount / 100000 >= 1) return `${Number(amount / 1000).toFixed(2)}K`;

    // < 100K
    return `${Number(amount).toFixed(2)}`;
  };

  const usdc = {
    image: IMG_USDC_TOKEN,
    symbol: "whUSDC",
    amount: Number(USDC.balance),
    firstAmount: User.saving.records.usdcRecord[0],
  };

  const usdt = {
    image: IMG_GLMR,
    symbol: "WGLMR",
    amount: Number(USDT.balance),
    firstAmount: 0,
  };

  const saver = {
    image: saverImage,
    symbol: "ABLE",
    amount: Number(Able.balance),
    firstAmount: Number(Able.balance),
  };

  const handleBurn = async () => {
    setShowTermsConditions(false);
    const amount_wei = web3.utils.toWei(burn_amount, "ether");
    const data = await Able.contract.methods.BurnPoints(amount_wei).encodeABI();
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

        setLoadingBurn(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading_burn) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (err) {
              clearInterval(interval);
              setLoadingBurn(false);
              setError(true);

              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }

            if (rec) {
              clearInterval(interval);
              await uploadBuyAble();
              setLoadingBurn(false);
              setFinalMessage(`Has quemado ${burn_amount} Puntos.`);
              setBurnAmount("");
              onOpen();
            }
          });
        }, 500);
      });
  };

  return (
    <>
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
              {error ? (
                <Text>Error, intentalo nuevamente.</Text>
              ) : (
                <Text>{finalMessage}</Text>
              )}
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
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {"Consentimiento"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>
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
                onClick={handleBurn}
                ml={3}
              >
                Acepto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w={{ lg: "-webkit-fit-content", sm: "full" }} zIndex={10}>
        <ERC20 props={saver} />

        {/* TRIANGULO */}
        <Image
          src={
            User.is_qualified ? qualifiedImage : notQualifiedImage
          }
          alt="triangle"
          boxSize={{ lg: "200px", md: "200px", sm: "150px", base: "150px" }}
          zIndex={10}
        />

        <VStack position="absolute">
          <Box h={{ lg: "280px", md: "250px", sm: "250px", base: "250px" }} />
          <Image
            src={IMG_CIRCLE_ZEN}
            alt="zen-circle"
            w={{
              "2xl": "619px",
              xl: "519px",
              lg: "430px",
              md: "619px",
              sm: "619px",
              base: "619px",
            }}
            h="200px"
            zIndex={0}
          />
        </VStack>

        <VStack position="absolute">
          <Box h={{ lg: "165px", md: "165px", sm: "145px", base: "145px" }} />
          <Image
            src={IMG_FIRE_BLUE}
            alt="img-fire-blue"
            boxSize={{ lg: "50px", md: "50px", sm: "30px", base: "30px" }}
          />
          <Text
            color={color}
            fontWeight="bold"
            fontSize={{ lg: "14px", md: "14px", sm: "12px", base: "10px" }}
            zIndex={10}
          >
            PUNTOS
          </Text>
          <HStack>
            <Text
              color={color}
              fontWeight="bold"
              fontSize={{ lg: "24px", md: "22px", sm: "20px", base: "18px" }}
              zIndex={10}
            >
              {formatAmount(Able.points.points_of)}
            </Text>
          </HStack>

          <Box h="3px" />
        </VStack>

        <HStack w={{ lg: "380px", md: "380px", sm: "full", base: "full" }}>
          <ERC20 props={usdc} />
          <Spacer />
          <VStack>
            <Text
              p="4px"
              borderRadius={6}
              color="blue.400"
              fontWeight="bold"
              fontSize="18px"
              zIndex={6}
            >
              Podra recibir:
            </Text>
            <Text
              p="4px"
              borderRadius={6}
              color="blue.400"
              fontWeight="bold"
              fontSize="28px"
              zIndex={6}
            >
              {Number(BaseReward.POTENCIAL * Number(Able.points.points_of)).toFixed(2)}{" "}
              {MAIN_CURRENCY}
            </Text>
          </VStack>
          <Spacer />
          <ERC20 props={usdt} />
        </HStack>

        <Box h="10px" />

        <Input
          value={burn_amount}
          onChange={(e) => setBurnAmount(e.currentTarget.value)}
          color="white"
          w="40%"
        />
        {loading_burn ? (
          <Loading />
        ) : (
          <VStack
            onClick={() => setShowTermsConditions(true)}
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            <Image src={IMG_FIRE} alt="fire" boxSize="50px" />
            <Text color="white">QUEMAR PUNTOS</Text>
          </VStack>
        )}
      </VStack>
    </>
  );
};
