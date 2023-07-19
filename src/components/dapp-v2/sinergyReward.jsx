import React from "react";
import {
  Image,
  Text,
  Button,
  VStack,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { IMG_ABLE_TOKEN, IMG_DAI_ORIGINAL, IMG_TOROID } from "../../images";
import { useProvider } from "../../context";
import {
  ABLE_CONFIDENCE_REWARD_ADDRESS,
  ABLE_CONSTANCY_REWARD_ADDRESS,
  ABLE_VALUE_REWARD_ADDRESS,
  buildTransaciont,
  MAIN_CURRENCY,
  STABLECOIN_CONFIDENCE_REWARD_ADDRESS,
  STABLECOIN_CONSTANCY_REWARD_ADDRESS,
  STABLECOIN_VALUE_REWARD_ADDRESS,
} from "../../web3/funcs";
import { Loading } from "./loading";
import { RewardFormula } from "./RewardFormula";
import { InfoIcon } from "@chakra-ui/icons";

/*
props: {
    title: "RECOMPENSAS PASIVAS",
    amount: 30,
    idx: 0 || 1 || 2
}
*/
const MIN_AMOUNT_OF_WALLETS_CONSTANCY_REWARD = 3;
const VALUE_REWARD = 0;
const CONSTANCY_REWARD = 1;
const CONFIDENCE_REWARD = 2;

export const SinergyReward = ({ props }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showFormula, setShowFormula] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const {
    addressAccount,
    uploadNftReward_Bronze,
    Able,
    User,
    ValueReward,
    ConstancyReward,
    ConfidenceReward,
    SinergyBronze,
  } = useProvider();

  // Methods
  const HandleClaimStablecoinValueReward = async () => {
    const data = await ValueReward.stablecoin.contract.methods
      .Claim()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      STABLECOIN_VALUE_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const HandleClaimAbleValueReward = async () => {
    const data = await ValueReward.able.contract.methods.Claim().encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      ABLE_VALUE_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const HandleClaimStablecoinConstancyReward = async () => {
    const data = await ConstancyReward.stablecoin.contract.methods
      .Claim()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      STABLECOIN_CONSTANCY_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const HandleClaimAbleConstancyReward = async () => {
    const data = await ConstancyReward.able.contract.methods
      .Claim()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONSTANCY_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const HandleClaimStablecoinConfidenceReward = async () => {
    const data = await ConfidenceReward.stablecoin.contract.methods
      .Claim()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      STABLECOIN_CONFIDENCE_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const HandleClaimAbleConfidenceReward = async () => {
    const data = await ConfidenceReward.able.contract.methods
      .Claim()
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONFIDENCE_REWARD_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              onOpen();
              clearInterval(interval);
              await uploadNftReward_Bronze(props.idx);
              setLoading(false);
              // Mostrar PopUp
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const getCorrectFunction = (able) => {
    switch (props.idx) {
      case 0:
        if (able) {
          HandleClaimAbleValueReward();
        } else {
          HandleClaimStablecoinValueReward();
        }
        break;
      case 1:
        if (able) {
          HandleClaimAbleConstancyReward();
        } else {
          HandleClaimStablecoinConstancyReward();
        }
        break;
      case 2:
        if (able) {
          HandleClaimAbleConfidenceReward();
        } else {
          HandleClaimStablecoinConfidenceReward();
        }
        break;
      default:
        break;
    }
  };

  // Amouts properties
  const GetUserAmount = () => {
    switch (props.idx) {
      case VALUE_REWARD:
        return ValueReward.stablecoin.user_amount;
      case CONSTANCY_REWARD:
        return ConstancyReward.stablecoin.user_amount;
      case CONFIDENCE_REWARD:
        return ConfidenceReward.stablecoin.user_amount;
      default:
        return 0;
    }
  };

  const GetTotalAmount = () => {
    switch (props.idx) {
      case VALUE_REWARD:
        return ValueReward.stablecoin.total_amount;
      case CONSTANCY_REWARD:
        return ConstancyReward.stablecoin.total_amount;
      case CONFIDENCE_REWARD:
        return ConfidenceReward.stablecoin.total_amount;
      default:
        return 0;
    }
  };

  // Messages properties
  const GetMessages = () => {
    switch (props.idx) {
      case VALUE_REWARD:
        return {
          user_amount: "Tus NFTs",
          total_amount: "NFTs Calificados Totales",
        };
      case CONSTANCY_REWARD:
        return {
          user_amount: "Tus Premios Able Ganados",
          total_amount: "Premios Able Ganados Calificados Totales",
        };
      case CONFIDENCE_REWARD:
        return {
          user_amount: "Cuenta Staking",
          total_amount: "Cuentas Staking Calificadas Totales",
        };
      default:
        return {
          user_amount: "Default msg",
          total_amount: "Default msg",
        };
    }
  };

  const isDisabledStablecoin = () => {
    if (props.idx == VALUE_REWARD)
      return (
        !ValueReward.stablecoin.can_claim ||
        !ValueReward.stablecoin.is_participate_on_this_reward
      );
    if (props.idx == CONSTANCY_REWARD)
      return (
        !ConstancyReward.stablecoin.can_claim ||
        !ConstancyReward.stablecoin.is_participate_on_this_reward
      );
    if (props.idx == CONFIDENCE_REWARD)
      return (
        !ConfidenceReward.stablecoin.can_claim ||
        !ConfidenceReward.stablecoin.is_participate_on_this_reward
      );
    return true;
  };

  const isDisabledAble = () => {
    if (props.idx == VALUE_REWARD)
      return (
        !ValueReward.able.can_claim ||
        !ValueReward.able.is_participate_on_this_reward
      );
    if (props.idx == CONSTANCY_REWARD)
      return (
        !ConstancyReward.able.can_claim ||
        !ConstancyReward.able.is_participate_on_this_reward
      );
    if (props.idx == CONFIDENCE_REWARD)
      return (
        !ConfidenceReward.able.can_claim ||
        !ConfidenceReward.able.is_participate_on_this_reward
      );
    return true;
  };

  const WhyIsNotQualifiedValue = () => {
    if (!ValueReward.stablecoin.is_participate_on_this_reward) {
      return (
        <Text fontWeight="bold" color="red.400">
          No has participado de este bote.
        </Text>
      );
    }
  };

  const WhyIsNotQualifiedConstancy = () => {
    if (Number(Able.amount_of_wins_able_reward_of) < 1) {
      return (
        <Text fontWeight="bold" color="red.400">
          Todavia no has recibido el Premio Able.
        </Text>
      );
    }
    if (
      Number(ConstancyReward.min_users_to_claim) <
      Number(Able.able_rewards_claimed)
    ) {
      return (
        <Text fontWeight="bold" color="red.400">
          Todavia no hay suficientes usuarios que hayan conseguido el Premio
          Able.
        </Text>
      );
    }
    if (!ConstancyReward.stablecoin.is_participate_on_this_reward) {
      return (
        <Text fontWeight="bold" color="red.400">
          No has participado de este bote.
        </Text>
      );
    }
  };

  const WhyIsNotQualifiedConfidence = () => {
    if (Number(Able.balance) < Number(ConfidenceReward.min_amount_able)) {
      return (
        <Text fontWeight="bold" color="red.400">
          No tienes los suficientes Able para participar del bote de la
          confianza.
        </Text>
      );
    }
    if (Able.has_transfer) {
      return (
        <Text fontWeight="bold" color="red.400">
          El ciclo anterior has transferido Able.
        </Text>
      );
    }
    if (!ConfidenceReward.stablecoin.is_participate_on_this_reward) {
      return (
        <Text fontWeight="bold" color="red.400">
          No has participado de este bote.
        </Text>
      );
    }
  };

  const GetWhyIsNotQualified = () => {
    if (!User.is_qualified) {
      return (
        <Text fontWeight="bold" color="red.400">
          El ciclo anterior lo cerraste descalificado
        </Text>
      );
    }

    switch (props.idx) {
      case VALUE_REWARD:
        return WhyIsNotQualifiedValue();
      case CONSTANCY_REWARD:
        return WhyIsNotQualifiedConstancy();
      case CONFIDENCE_REWARD:
        return WhyIsNotQualifiedConfidence();
      default:
        break;
    }
  };

  // Component
  return (
    <>
      {/* Alerta Recompensa Recibida */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Recompensa recibida!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error ? (
                <Text color="white">Error, intentalo nuevamente.</Text>
              ) : null}
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

      {/* Informacion de los botes */}
      <AlertDialog
        isOpen={showInfo}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowInfo(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700" minW="1200px">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              Informacion del Bote ({props.title})
            </AlertDialogHeader>
            <AlertDialogBody>
              <Heading size="sm" color="white">
                {props.subtitle}
              </Heading>
              <Box h="10px" />
              <Divider />
              <Box h="10px" />
              <Heading size="md" color="white">
                Como se obtienen los fondes de este bote?
              </Heading>
              <Box h="10px" />
              <Text color="white">{props.funding}</Text>
              <Box h="10px" />
              <Divider />
              <Box h="10px" />
              <Heading size="md" color="white">
                Como participar de este bote?
              </Heading>
              <Box h="10px" />
              <Text color="white">
                Para calificar y recibir de este bote, la billetera debe cumplir
                estas condiciones
              </Text>
              <Box h="10px" />
              {props.qualifing.map((condition, idx) => (
                <Text color="white" key={idx}>
                  {condition}
                </Text>
              ))}
              <Box h="10px" />
              <Divider />
              <Box h="10px" />
              <Heading size="md" color="white">
                Como se reparte este bote entre las billeteras participantes?
              </Heading>
              <Box h="10px" />
              <VStack w="full">
                <Heading size="md" color="white">
                  Stablecoin
                </Heading>
                <RewardFormula
                  amount_to_claim={props.stablecoin.amount_to_claim}
                  user_amount={GetUserAmount()}
                  raised_amount={props.stablecoin.total_amount}
                  total_amount={GetTotalAmount()}
                  msgs={GetMessages()}
                />
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                <Heading size="md" color="white">
                  Able
                </Heading>
                <RewardFormula
                  amount_to_claim={props.able.amount_to_claim}
                  user_amount={GetUserAmount()}
                  raised_amount={props.able.total_amount}
                  total_amount={GetTotalAmount()}
                  msgs={GetMessages()}
                />
              </VStack>
              <Box h="10px" />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={() => setShowInfo(false)}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack>
        <HStack w="full">
          <Box w="20px" />
          <Text fontWeight="bold" color="blue.300" fontSize="25px">
            {props.title}
          </Text>
          <Spacer />
          <Button onClick={() => setShowInfo(true)} bg="black">
            <InfoIcon color="white" />
          </Button>
        </HStack>
        <Box h="10px" />

        <Image src={IMG_TOROID} alt="toroid" boxSize="150px" zIndex={10} />

        <VStack position="absolute" zIndex={10}>
          <Box h="80px" />

          <HStack>
            <Text fontSize="25px" color="white" fontWeight="bold">
              {props.stablecoin.total_amount}
            </Text>
            <Image src={IMG_DAI_ORIGINAL} alt="dai" boxSize="30px" />
          </HStack>
          <HStack>
            <Text fontSize="25px" color="white" fontWeight="bold">
              {props.able.total_amount}
            </Text>
            <Image src={IMG_ABLE_TOKEN} alt="able" boxSize="30px" />
          </HStack>
        </VStack>

        <Box h="5px" />

        {loading ? (
          <Loading />
        ) : (
          <HStack>
            <VStack>
              <Button
                variant="actionDapp"
                isDisabled={isDisabledStablecoin()}
                onClick={() => getCorrectFunction(false)}
              >
                RECLAMAR {MAIN_CURRENCY}
              </Button>
              <Text fontSize="25px" color="white" fontWeight="bold">
                {props.stablecoin.amount_to_claim}
              </Text>
            </VStack>

            <VStack>
              <Button
                variant="actionDapp"
                isDisabled={isDisabledAble()}
                onClick={() => getCorrectFunction(true)}
              >
                RECLAMAR ABLE
              </Button>
              <Text fontSize="25px" color="white" fontWeight="bold">
                {props.able.amount_to_claim}
              </Text>
            </VStack>
          </HStack>
        )}

        {GetWhyIsNotQualified()}
      </VStack>
    </>
  );
};
