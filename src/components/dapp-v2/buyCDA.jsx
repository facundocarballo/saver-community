import React from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  Image,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { MAIN_CURRENCY } from "../../web3/funcs";
import { IMG_PIGGY_BANK, IMG_DAI_TOKEN } from "../../images";
import { BuyAble } from "./buyAble";
import { GetMinAmountToIncreasePoints } from "../../web3/funcs/auxs/sinergy-sale";

export const BuyCDA = () => {
  // Attributes
  const [error, setError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [showAlertAgree, setShowAlertAgree] = React.useState(false);

  // Context
  const { User, Able, min_amount_to_increase_points } = useProvider();

  // Methods
  const getFontSize = (amount) => {
    if (amount < 100) return "20px";
    if (amount < 1000) return "15px";
    return "12px";
  };

  // Component
  return (
    <VStack w="full">
      {/* Transaccion Exitosa o Error */}
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

      {/* Terms & Conditions */}
      <AlertDialog
        isOpen={showAlertAgree}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowAlertAgree(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {"Consentimiento"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                Soy consciente que los TRIPLE INT. que estoy adquiriendo ahora,
                representan el compromiso para aumentar mis ahorros y que los
                puedo transferir de manera externa como tokens a mi billetera
                una vez haya ganado al menos una vez el Premio ABLE. Y acepto
                que los fondos recaudados por esta operación sean gestionados y
                distribuidos por el sistema a los usuarios calificados como está
                establecido en el Whitepaper. Doy mi consentimiento
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Link
                isExternal
                href="https://saver-community.gitbook.io/es/"
                color="blue.400"
              >
                Whitepaper
              </Link>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                // onClick={handleDonate}
                ml={3}
              >
                Acepto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack>
        <Image src={IMG_DAI_TOKEN} alt="ableToken" boxSize="55px" />

        <Image
          zIndex={3}
          src={IMG_PIGGY_BANK}
          alt="buyCDAimage"
          boxSize="200px"
        />

        <VStack position="absolute">
          <Image
            src="https://i.ibb.co/ZNQq9Pv/luz-cerdito.png"
            alt="luz"
            w="360px"
          />
        </VStack>

        <VStack zIndex={3} position="absolute">
          <Box h={{ lg: "125px", md: "140px", sm: "120px", base: "120px" }} />

          <HStack>
            <Box w="20px" />
            <VStack>
              <Text
                color="black"
                fontWeight="bold"
                fontSize={getFontSize(Number(Able.points.points_of))}
              >
                {Able.points.points_of}
              </Text>
              <Text
                color="black"
                fontSize={getFontSize(Number(Able.points.points_of))}
                fontWeight="bold"
              >
                Puntos
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <BuyAble />

        {Number(Able.points.points_of) <
        User.qualified.PERCENT_DAILY_INCREASE * Number(User.last_points) ? (
          <>
            <HStack>
              <Text
                color="blue.400"
                fontWeight="bold"
                zIndex={6}
                fontSize="18px"
              >
                Adquiriendo{" "}
              </Text>
              <Text color="white" fontWeight="bold" zIndex={6} fontSize="22px">
                {Number(Number(min_amount_to_increase_points) / 3).toFixed(4)}{" "}
              </Text>
              <Text
                color="blue.400"
                fontWeight="bold"
                zIndex={6}
                fontSize="18px"
              >
                ABLE
              </Text>
            </HStack>
            <Text color="blue.400" fontWeight="bold" zIndex={6}>
              Con: {Number(min_amount_to_increase_points).toFixed(4)}{" "}
              {MAIN_CURRENCY}
            </Text>
            <Text color="blue.400" fontWeight="bold" zIndex={6}>
              Aumentara el{" "}
              {(
                (Number(User.qualified.PERCENT_DAILY_INCREASE) - 1) *
                100
              ).toFixed(2)}
              % de sus puntos.
            </Text>
          </>
        ) : null}
      </VStack>

      <Box h="10px" />
    </VStack>
  );
};
