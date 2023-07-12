import React from "react";
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { MAIN_CURRENCY, buildTransaciont } from "../../web3/funcs";
import { IMG_DAI_TOKEN, IMG_HAND_REWARD, IMG_SINERGY_GOLD } from "../../images";
import { Loading } from "./loading";
import { STABLECOIN_BASE_REWARD_ADDRESS } from "../../web3/funcs";
import { RewardFormula } from "./RewardFormula";

export const Reward = () => {
  // Attributes
  const rewardImage = IMG_HAND_REWARD;
  const [loading, setLoading] = React.useState(false);
  const [amountClaimed, setAmountClaimed] = React.useState(0);
  const [isOpenClaimMessage, setIsOpenClaimMessage] = React.useState(false);
  const cancelRef = React.useRef();

  const msgs = {
    user_amount: "Tus puntos",
    total_amount: "Puntos Calificados Totales"
  };

  // Context
  const { addressAccount, uploadReward, User, BaseReward, Able } = useProvider();

  // Methods
  const handleClaim = async () => {
    // Seteamos el monto que va a recibir el usuario
    // Que saldra luego en el pop up
    setAmountClaimed(BaseReward.actual.amount_to_claim);

    const data = await BaseReward.contract.methods.Claim().encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      STABLECOIN_BASE_REWARD_ADDRESS,
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
        var i = 1;
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadReward();
              setLoading(false);
              setIsOpenClaimMessage(true);
            }
            if (err) {
              clearInterval(interval);
              console.log("ERROR: ", err);
            }
          });

          i++;
        }, 500);
      });
  };

  const showCoin = () => {
    if (User.is_qualified && Number(BaseReward.actual.amount_to_claim) > 0)
      return true;
    return false;
  };

  // Component
  return (
    <>
      {/* PopUp Claim */}
      <AlertDialog
        isOpen={isOpenClaimMessage}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpenClaimMessage(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Gracias por Ahorrar con Able Saver
            </AlertDialogHeader>

            <AlertDialogBody w="full">
              <VStack w="full">
                <Image src={IMG_SINERGY_GOLD} alt="able-img" boxSize="250px" />
                <Text color="white">
                  Has recibido un regalo por conservar tus ahorros junto a Saver
                  Community.
                </Text>
                <Text color="white" fontSize="40px" fontWeight="bold">
                  {amountClaimed} {MAIN_CURRENCY}
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={() => setIsOpenClaimMessage(false)}
                ml={3}
              >
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {loading ? (
        <Loading />
      ) : (
        <VStack>
          <Heading
            color="yellow.400"
            fontSize={{
              xl: "4xl",
              lg: "2xl",
              md: "2xl",
              sm: "2xl",
              base: "xl",
            }}
          >
            {"REGALO POR CALIFICACIÓN"}
          </Heading>

          <Box h="75px" />

          {/* Imagen de la moneda */}
          {showCoin() ? (
            <VStack position="absolute">
              <Box
                h={{
                  xl: "44px",
                  lg: "54px",
                  md: "64px",
                  sm: "64px",
                  base: "44px",
                }}
              />
              <HStack>
                <Box w="30px" />
                <Image alt="reward" src={IMG_DAI_TOKEN} boxSize="60px" />
              </HStack>
            </VStack>
          ) : null}

          {/* Imagen de la manito */}
          <HStack w="full">
            <Box
              w={{
                "2xl": "130px",
                xl: "130px",
                lg: "80px",
                md: "90px",
                sm: "90px",
                base: "80px",
              }}
            />
            <Image alt="reward" src={rewardImage} w="190px" h="70px" />
          </HStack>

          <Box h="10px" />
          {showCoin() ? (
            <Button variant="actionDapp" onClick={handleClaim}>
              RECIBIR
            </Button>
          ) : null}

          <Box h='10px' />
          <Divider />
          <RewardFormula 
            amount_to_claim={BaseReward.actual.amount_to_claim}
            user_amount={BaseReward.actual.user_amount}
            raised_amount={BaseReward.actual.raised_amount}
            total_amount={BaseReward.actual.total_amount}
            msgs={msgs}
          />
          <Divider />
          
          {!User.is_qualified ? (
            <Text fontWeight="bold" color="red.400">
              El ciclo anterior lo cerraste descalificado
            </Text>
          ) : BaseReward.has_claimed ? (
            <Text fontWeight="bold" color="red.400">
              Ya has recibido tu regalo
            </Text>
          ) : null}

          <Box h="30px" />

          <Text color="white" fontSize="20px" fontStyle="bold">
            {Number(User.stablecoin_earned_on_able_reward).toFixed(2)}{" "}
            {MAIN_CURRENCY} Obtenidos en Regalo por {"Calificación"} desde que{" "}
            {"inició"} el Premio ABLE
          </Text>
          <Text color="white" fontSize="20px" fontStyle="bold">
            {Number(BaseReward.amount_earned).toFixed(2)} {MAIN_CURRENCY}{" "}
            Obtenidos en Regalo por {"Calificación"} desde que {"inició"} la
            cuenta
          </Text>
        </VStack>
      )}
    </>
  );
};
