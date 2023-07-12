import React from "react";
import {
  HStack,
  VStack,
  Spacer,
  Image,
  Button,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ReactConfetti from "react-confetti";
import { DaysPlaying } from "../../components/dapp-v2/daysPlaying";
import {
  ABLE_CONTRACT_ADDRESS,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  buildTransaciont,
} from "../../web3/funcs";
import { useProvider } from "../../context";
import {
  IMG_ABLE_REWARD_BADGE,
  IMG_ABLE_REWARD_TITLE,
  IMG_ABLE_TOKEN,
  IMG_COFRE,
} from "../../images";
import { Loading } from "../../components/dapp-v2/loading";

export const AbleReward = () => {
  // Attributes
  const ableImage = "https://i.ibb.co/SBK7YL8/logo-Able-Saver.png";
  const [loading, setLoading] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const { addressAccount, Able, uploadAbleReward, Clock } = useProvider();
  // Methods
  const detectSize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleClaim = async () => {
    const data = await Able.contract.methods.ClaimAble().encodeABI();

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
        const interval = setInterval(async () => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              clearInterval(interval);
              setShowConfetti(true);
              onOpen();
              await uploadAbleReward();
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

  // React UseEffect
  React.useEffect(() => {
    console.log("Windows: ", windowDimensions);
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimensions]);

  // Component
  return (
    <>
      {/* Alert of Congratulation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              Felicitaciones!!! Premio Able Conseguido!!!
            </AlertDialogHeader>

            <AlertDialogBody w="full">
              <VStack w="full">
                <Image src={IMG_COFRE} alt="reward" boxSize="350px" />
                <Text color="white">Has recibido</Text>
                <Text color="white" fontSize="40px" fontWeight="bold">
                  {(Number(Able.points.points_of) * Number(Able.reward.POTENCIAL_ABLE)).toFixed(2)} ABLE
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Image src={IMG_ABLE_TOKEN} alt="ableToken" boxSize="100px" />
      <Image
        src={IMG_ABLE_REWARD_TITLE}
        alt="ableReward"
        w={{ xl: "35%", lg: "50%", md: "65%", sm: "85%", base: "90%" }}
      />
      <Box h="10px" />

      {/* Desktop */}
      <HStack
        w="full"
        display={{ lg: "flex", md: "none", sm: "none", base: "none" }}
      >
        <Box w="75px" />
        <DaysPlaying />
        <Spacer />
        {loading ? (
          <Loading />
        ) : (
          <Button
            isDisabled={
              (Number(Clock.cycle) - Number(Able.reward.cycle_to_able_reward)) <= 0
            }
            variant="actionDapp"
            onClick={handleClaim}
          >
            RECIBIR PREMIO
          </Button>
        )}
        {showConfetti ? (
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height * 4.55}
          />
        ) : null}
        {/* Falta la condicion */}
        {Able.reward.won_able_reward ? (
          <VStack>
            <Image
              src={IMG_ABLE_REWARD_BADGE}
              alt="badge-able-reward"
              w="80px"
            />
            <Text fontSize="25px" color="white">
              {Able.reward.amount_of_wins_able_reward_of}
            </Text>
          </VStack>
        ) : null}

        <Box w="175px" />
      </HStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "flex", sm: "flex", base: "flex" }}
      >
        <Box h="50px" />
        <DaysPlaying />
        <Box h="50px" />
        {loading ? (
          <Loading />
        ) : (
          <Button
            isDisabled={
              Number(Clock.cycle) - Number(Able.reward.cycle_to_able_reward) < 0
            }
            variant="actionDapp"
            onClick={handleClaim}
          >
            RECIBIR PREMIO
          </Button>
        )}
        {showConfetti ? (
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height * 5.5}
          />
        ) : null}
        <Box h="50px" />
      </VStack>
    </>
  );
};
